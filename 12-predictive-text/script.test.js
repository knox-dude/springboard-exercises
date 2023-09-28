describe('Script test (with setup and tear-down)', ()=>{
    it('should return matching results from fruit correctly', () => {
        expect(search('ap')).toContain('Apple');
        expect(search('ap')).toContain('Grape');
        expect(search('z')).toContain('Yuzu');
        expect(search('')).toEqual([]);
    })

    it('should correctly return bolded strings', () => {
        let searchResults = search('z');
        expect(boldSubstring(searchResults[0], 'z')).toBe('Yu<b>z</b>u');
    })

})