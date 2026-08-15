function Get-SeismicSourceDefinition {
    [ordered]@{
        Service = 'Seismic'
        Authority = 'ITEWC–INCOIS / GEBCO'
        Urls = @(
            'https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json',
            'https://wms.gebco.net/mapserv'
        )
    }
}
