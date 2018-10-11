
const axios = require('axios');
const Timetable = require('../lib/timetable.js');


class TimetableClient{


  get(name, date){

    var query = `{stops(name: "${name}"){
      name
    	stoptimesForServiceDate(date: "${date}"){
        stoptimes{
          scheduledDeparture
        }
        pattern{
          route {
            shortName
          }
        }
      }
    }
    }`;

    return new Promise( (resolve, reject) => {

      const config = {
        url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({"query":query})
      };
      axios(config)
      .then(res => res.data )
      .then( body => {

        let timetable = new Timetable(body.data, name);
        resolve(timetable.sort().toJSON());   

      });

    });

  }

}

module.exports = TimetableClient;
