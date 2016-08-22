import converData from 'Helpers/convertData';
module.exports = function() {
  describe('convert data', () => {
    beforeAll(()=>{
        window.patterns = ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'];
    });
    it('should return null if incorrect array is passed in', () => {
      let array = [];
      expect(converData(array)).toBe(null);
    });

    // it('should convert array into datas', () => {
    //   let array = [{id:"sign-ins-per-account",
    //                 name: "Sign in per account",
    //                 note: "note for this dataset",
    //                 recorded_at: "2016-04-19T01:01:01.111Z",
    //                 units:"",
    //                 data: [{ "label": "2014-12", "value": 73},
    //       { "label": "2015-01", "value": 70},
    //       { "label": "2015-02", "value": 70}]
    //             }];
    //   let convertedArray = converData(array);
    //   expect(convertedArray.length).toBe(1);
    //   expect(convertedArray[0].length).toBe(3);
    // });

    // it('should convert array into data with neccessary properties', () => {
    //   let array = [{id:"sign-ins-per-account",
    //                 name: "Sign in per account",
    //                 note: "note for this dataset",
    //                 recorded_at: "2016-04-19T01:01:01.111Z",
    //                 units:"",
    //                 data: [{ "label": "2014-12", "value": 73},
    //       { "label": "2015-01", "value": 70},
    //       { "label": "2015-02", "value": 70}]
    //             }];
    //   let convertedArray = converData(array);
    //   expect(convertedArray[0][0].x).toBeDefined();
    //   expect(convertedArray[0][0].y).toBeDefined();
    //   expect(convertedArray[0][0].color).toBeDefined();
    //   expect(convertedArray[0][0].altColor).toBeDefined();
    //   expect(convertedArray[0][0].altLineStyle).toBeDefined();
    //   expect(convertedArray[0][0].id).toBeDefined();
    //   expect(convertedArray[0][0].name).toBeDefined();
    // });

    afterAll(()=>{
        window.patterns = undefined;
    })
  });
}
