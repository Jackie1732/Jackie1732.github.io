[CmdletBinding()]
param(
    [switch]$Serve,
    [string]$RubyRoot = 'F:\Ruby33-x64',
    [string]$ToolRoot = 'F:\dev-tools\jekyll'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$ruby = Join-Path $RubyRoot 'bin\ruby.exe'
$bundle = Join-Path $RubyRoot 'bin\bundle.bat'

if (-not (Test-Path -LiteralPath $ruby)) {
    throw "Ruby was not found at $ruby. Install Ruby+DevKit there or pass -RubyRoot."
}

if (-not (Test-Path -LiteralPath $bundle)) {
    throw "Bundler was not found at $bundle."
}

$paths = @{
    Home             = Join-Path $ToolRoot 'home'
    Gems             = Join-Path $ToolRoot 'gems'
    BundleUser       = Join-Path $ToolRoot 'bundle-user'
    BundleCache      = Join-Path $ToolRoot 'bundle-cache'
    BundleConfig     = Join-Path $ToolRoot 'bundle-config'
    BundlePath       = Join-Path $ToolRoot 'bundle'
    Site             = Join-Path $ToolRoot 'site'
    Temp             = Join-Path $ToolRoot 'tmp'
}

@($ToolRoot) + $paths.Values | ForEach-Object {
    New-Item -ItemType Directory -Force -Path $_ | Out-Null
}

# These settings are process-local: no global PATH or user-profile configuration is changed.
$env:Path = "$RubyRoot\bin;$env:Path"
$env:HOME = $paths.Home
$env:GEM_HOME = $paths.Gems
$env:GEM_PATH = "$($paths.Gems);$RubyRoot\lib\ruby\gems\3.3.0"
$env:BUNDLE_USER_HOME = $paths.BundleUser
$env:BUNDLE_USER_CACHE = $paths.BundleCache
$env:BUNDLE_APP_CONFIG = $paths.BundleConfig
$env:BUNDLE_PATH = $paths.BundlePath
$env:TEMP = $paths.Temp
$env:TMP = $paths.Temp
$env:TMPDIR = $paths.Temp

Push-Location $repositoryRoot
try {
    & $bundle install
    if ($LASTEXITCODE -ne 0) {
        throw "bundle install failed with exit code $LASTEXITCODE"
    }

    if ($Serve) {
        & $bundle exec jekyll serve --host 127.0.0.1 --destination $paths.Site
    }
    else {
        & $bundle exec jekyll clean --destination $paths.Site
        if ($LASTEXITCODE -ne 0) {
            throw "Jekyll clean failed with exit code $LASTEXITCODE"
        }

        & $bundle exec jekyll build --destination $paths.Site
    }

    if ($LASTEXITCODE -ne 0) {
        throw "Jekyll failed with exit code $LASTEXITCODE"
    }
}
finally {
    Pop-Location
}
