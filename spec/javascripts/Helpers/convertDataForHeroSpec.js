import converDataForHero from 'Helpers/convertDataForHero';
import d3 from 'd3';
module.exports = function() {
  describe('convert for hero', () => {
    beforeAll(()=>{
    });
    it('should return null if incorrect array is passed in', () => {
      let array = [];
      expect(converDataForHero(array)).toBe(null);
    });
    afterAll(()=>{
      d3.selectAll('.patterns').remove();
    });
  });
}
