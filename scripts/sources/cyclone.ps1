function Get-CycloneSourceDefinition {
    [ordered]@{
        Service = 'Cyclone'
        Authority = 'INCOIS / IMD'
        Urls = @(
            'https://incois.gov.in/site/services/jointbulletin.jsp',
            'https://mausam.imd.gov.in/imd_latest/contents/cyclone.php#'
        )
    }
}
