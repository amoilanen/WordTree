define(['wordtree'], function(wordtree) {

  describe('add', function() {

    it('adds two numbers', function() {
      expect(wordtree.add(1, 2)).toBe(3);
    });
  });
});

