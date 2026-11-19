---
name: oceanwatch-qa
description: Runs complete quality assurance, asset verification, schema checks, and PowerShell syntax audits for India Ocean Watch.
---

# Ocean Watch Quality Assurance & Verification

Use this skill when auditing changes, before opening pull requests, or after updating assets, scripts, or maps.

## Comprehensive QA Checklist

### 1. Asset & Cache Query Audit
Validates all JS files via Node VM, ensures zero missing local assets, verifies GeoJSON topologies, checks for duplicate HTML IDs, and validates cache query string parity:
```powershell
npm test
```

### 2. Status Snapshot Validation
Validates both production and test fixture status snapshots against the contract schema:
```powershell
powershell -NoProfile -File tests/validation/validate-status.ps1
```

### 3. PowerShell AST Syntax Parsing
Ensures all `.ps1` scripts in `scripts/` and `tests/` parse without syntax errors:
```powershell
Get-ChildItem scripts,tests -Recurse -Filter *.ps1 | ForEach-Object {
  $tokens = $null; $errors = $null
  [System.Management.Automation.Language.Parser]::ParseFile($_.FullName, [ref]$tokens, [ref]$errors) | Out-Null
  if ($errors.Count) {
    Write-Error "$($_.FullName): $($errors.Message -join '; ')"
  }
}
```
