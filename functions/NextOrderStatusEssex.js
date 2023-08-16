// 'not_seen','seen','assigned','coming_pick','picked','reached','processing','coming_drop','dropped'

export default NextOrderStatusEssex = CurrentOrderStatus => {
  return new Promise(function(res, rej) {
    const status = CurrentOrderStatus;
    let response = [];

    if (!(status === null || status === 'null')) {
      //assigned
      if (status === 'assigned') {
        response.push({
          colorStatus: '#35b0f2',
          textStatus: 'Going for Collecting',
          orderStatus: 'coming_pick',
        });
        res(response[0]);
        return;
      }
      //coming_pick
      else if (status === 'coming_pick') {
        // response.push({
        //   colorStatus: '#35b0f2',
        //   textStatus: 'Picked',
        //   orderStatus: 'picked',
        // });
        response.push({
          colorStatus: '#35b0f2',
          // textStatus: 'Cleaning',
          textStatus: 'Booked',
          orderStatus: 'processing',
        });



        res(response[0]);
        return;
      } //picked
      // else if (status === 'picked') {
      //   response.push({
      //     colorStatus: '#35b0f2',
      //     textStatus: 'Reached at laundry house',
      //     orderStatus: 'reached',
      //   });
      //   res(response[0]);
      //   return;
      // } //reached
      // else if (status === 'reached') {
      //   response.push({
      //     colorStatus: '#35b0f2',
      //     textStatus: 'Cleaning',
      //     orderStatus: 'processing',
      //   });
      //   res(response[0]);
      //   return;
      // } //processing
      else if (status === 'processing') {
        // response.push({
        //   colorStatus: '#35b0f2',
        //   textStatus: 'Coming for delivering',
        //   orderStatus: 'coming_drop',
        // });

        response.push({
          colorStatus: '#35b0f2',
          // textStatus: 'Coming for delivering',
          textStatus: 'Going for delivering',
          orderStatus: 'coming_drop',
        });
        res(response[0]);
        return;
      } //coming_drop
      else if (status === 'coming_drop') {
        // response.push({
        //   colorStatus: '#35b0f2',
        //   textStatus: 'Dropped',
        //   orderStatus: 'dropped',
        // });
        response.push({
          colorStatus: '#35b0f2',
          // textStatus: 'Dropped',
          textStatus: 'Completed',
          orderStatus: 'dropped',
        });
        res(response[0]);
        return;
      } //dropped
      else if (status === 'dropped') {
        // response.push({
        //   colorStatus: '#35b0f2',
        //   textStatus: 'Completed',
        //   orderStatus: 'completed',
        // });
        response.push({
          colorStatus: '#35b0f2',
          textStatus: 'Completed',
          orderStatus: 'completed',
        });
        res(response[0]);
        return;
      } //else
      else {
        response.push({
          colorStatus: '#35b0f2',
          textStatus: 'No Match',
          orderStatus: 'no_match',
        });
        res(response[0]);
        return;
      }
    } else {
      response.push({
        colorStatus: '#35b0f2',
        textStatus: 'NA',
        orderStatus: 'NA',
      });
      res(response[0]);
      return;
    }
  });
};

// response.push({
//     colorStatus:'#',
//     textStatus:'',
// })
