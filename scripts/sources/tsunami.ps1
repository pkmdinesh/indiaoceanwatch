function Get-TsunamiSourceDefinition {
    [ordered]@{
        Service = 'Tsunami'
        Authority = 'ITEWC–INCOIS'
        Urls = @(
            'https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json',
            'https://tsunami.incois.gov.in/TEWS/'
        )
    }
}
