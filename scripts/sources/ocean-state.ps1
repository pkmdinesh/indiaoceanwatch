function Get-OceanStateSourceDefinition {
    [ordered]@{
        Service = 'Ocean State Forecast'
        Authority = 'INCOIS'
        Urls = @(
            'https://incois.gov.in/site/services/Alerts.html',
            'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons'
        )
    }
}
