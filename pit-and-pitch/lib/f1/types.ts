export type driver = { 
    driverld: string;
    permanentNumber?: string;
    code?: string;
    givenName: string;
    dateofBirth: string;
    nationality: string;
    url: string;
};


export type Constructor= {
    constructorId: string;
    name: string;
    nationality: string;
    url: string;
};


export type Circuit= {
    circuitId: string;
    circuitName: string;
    Location:{
        locality: string;
        country: string;
    };
};

type session ={
    date: string;
    time?: string;
};

export type Race ={
    season: string;
    raceName: string;
    Circuit: Circuit;
    date: string;
    time?: string;
    Qualifying?: session;
    Sprint?: session;
};

export type RaceResult ={
    number: string;
    position: string;
    positiontext: string;
    points: string;
    grid: string;
    laps: string;
    status: string;
    Driver: driver;
    constructor: Constructor;
    time?:{millis?: string;
        time: string
    };
    FastestLap?: {rank: string;
        lap: string;
        Time:{time: string;}};  
};

export type Racewithresults = Race & {
    results: RaceResult[]};


export type DriverStanding={
    position: string;
    points: string;
    wins: string;
    Driver: driver;
    Constructors: Constructor[];
};

export type ConstructorStanding = {
    position: string;
    points: string;
    wins: string;
    Constructor: Constructor;
};

type envelope<T> = {MRData:
    {total: string} & T};

export type RaceResponse = envelope<{
    RaceTable: {Races: Race[]};
}>;

export type ResultResponse= envelope<{
    RaceTable: {Races:
        Racewithresults[]};
}>;

export type DriverResponse =envelope<{
    DriverTable: {Drivers:
        driver[]};
    }>;

    export type ConstructorsResponse=
    envelope<{
        ConstructorTable:
        {Constructors: Constructor[]};
        }>;

        export type DriverStandingResponse= envelope<{
            standingstable:{
                standinglists:{season: string;
                    round: string;
                    DriverStandings: DriverStanding[]}[];
                };
            }>;

           export type ConstructorStandingsResponse = envelope<{
  StandingsTable: {
    StandingsLists: { season: string; round: string; ConstructorStandings: ConstructorStanding[] }[];
  };
}>;

export type F1Favorites = {
  driverId: string | null;
  constructorId: string | null;
};
