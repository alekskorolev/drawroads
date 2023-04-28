import RLink from "./link"
import linkData from 'src/../../test/fixtures/link';

describe('Svg link generator (link.ts)', () => {
  describe('rotate coords', () => {
    let link: RLink;
    const center = {x:0, y:0};
    beforeEach(() => {
      link = new RLink(linkData, [])
    });

    it('rotate 90', () => {
      const rotates = link.rotateCoord(center, {x:10, y:0}, Math.PI/2)
      expect(rotates).toEqual({x:0, y: 10});
    });
    it('rotate 180', () => {
      const rotates = link.rotateCoord(center, {x:10, y:0}, Math.PI)
      expect(rotates).toEqual({x:-10, y: 0});
    });
    it('rotate 270', () => {
      const rotates = link.rotateCoord(center, {x:10, y:0}, 3*Math.PI/2)
      expect(rotates).toEqual({x:-0, y: -10});
    });
    it('rotate 360', () => {
      const rotates = link.rotateCoord(center, {x:10, y:0}, 2*Math.PI)
      expect(rotates).toEqual({x:10, y: -0});
    });
  });
});
