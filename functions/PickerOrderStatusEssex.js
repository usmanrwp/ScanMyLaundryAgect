// 'not_seen','seen','assigned','coming_pick','picked','reached','processing','coming_drop','dropped'

export default PickerOrderStatusEssex = onWard => {
  return new Promise(function(res, rej) {
    let response = [];

    if (
      onWard === 'All' ||
      onWard === '' ||
      onWard === null ||
      onWard === 'assigned'
    ) {
      response.push({
        colorStatus: '#9c0606',
        // textStatus: 'Coming for Collecting',
        textStatus: 'Going for Collecting',
        orderStatus: 'coming_pick',
      });

      // response.push({
      //   colorStatus: '#35b0f2',
      //   textStatus: 'Picked',
      //   orderStatus: 'picked',
      // });

      // response.push({
      //   colorStatus: '#35b0f2',
      //   textStatus: 'Reached at laundry house',
      //   orderStatus: 'reached',
      // });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Cleaning',
        textStatus: 'Booked',
        orderStatus: 'processing',
      });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Coming for delivering',
        textStatus: 'Going for delivering',
        orderStatus: 'coming_drop',
      });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Dropped',
        textStatus: 'Completed',
        orderStatus: 'dropped',
      });

      res(response);
      return response;
    } else if (onWard === 'coming_pick') {
      // response.push({
      //   colorStatus: '#35b0f2',
      //   textStatus: 'Picked',
      //   orderStatus: 'picked',
      // });

      // response.push({
      //   colorStatus: '#35b0f2',
      //   textStatus: 'Reached at laundry house',
      //   orderStatus: 'reached',
      // });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Cleaning',
        textStatus: 'Booked',
        orderStatus: 'processing',
      });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Coming for delivering',
        textStatus: 'Going for delivering',
        orderStatus: 'coming_drop',
      });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Dropped',
        textStatus: 'Completed',
        orderStatus: 'dropped',
      });

      res(response);
      return response;
    } 
    // else if (onWard === 'picked') {
    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Reached at laundry house',
    //     orderStatus: 'reached',
    //   });

    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Cleaning',
    //     orderStatus: 'processing',
    //   });

    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Coming for delivering',
    //     orderStatus: 'coming_drop',
    //   });

    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Dropped',
    //     orderStatus: 'dropped',
    //   });

    //   res(response);
    //   return response;
    // } 
    // else if (onWard === 'reached') {
    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Cleaning',
    //     orderStatus: 'processing',
    //   });

    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Coming for delivering',
    //     orderStatus: 'coming_drop',
    //   });

    //   response.push({
    //     colorStatus: '#35b0f2',
    //     textStatus: 'Dropped',
    //     orderStatus: 'dropped',
    //   });

    //   res(response);
    //   return response;
    // } 
    else if (onWard === 'processing') {
      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Coming for delivering',
        textStatus: 'Going for delivering',
        orderStatus: 'coming_drop',
      });

      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Dropped',
        textStatus: 'Completed',
        orderStatus: 'dropped',
      });

      res(response);
      return response;
    } else if (onWard === 'coming_drop') {
      response.push({
        colorStatus: '#35b0f2',
        // textStatus: 'Dropped',
        textStatus: 'Completed',
        orderStatus: 'dropped',
      });

      res(response);
      return response;
    } else if (onWard === 'dropped') {
      response.push({
        colorStatus: '#35b0f2',
        textStatus: 'Completed',
        orderStatus: 'completed',
      });

      res(response);
      return response;
    } else {
      response.push({
        colorStatus: '#35b0f2',
        textStatus: 'No Match',
        orderStatus: 'no_match',
      });

      res(response);
      return response;
    }
  });
};
