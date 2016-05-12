describe('NOTES PAGE', function() {

    var buttonAddNewNote = null;
    var body = null;

    function init() {
        buttonAddNewNote = element(by.css('.add-notes button'));
        body = element(by.css('body'));
    };

    function getCountNotes() {

    };

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get('http://localhost:8080/#/notes');
        browser.refresh();
        init();
    });

    it('added note', function(done) {
        element.all(by.css('.notes-container > div > div')).count().then(function(count) {
            expect(count).toBe(0);
            buttonAddNewNote.click().then(function() {
                element.all(by.css('.notes-container > div > div')).count().then(function(newCount) {
                    expect(newCount).toBe(1);
                    done();
                });
            });
        });
        // browser.pause(10000);
    });
});