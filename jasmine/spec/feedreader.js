/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
       it('have URLs', function() {
            for(feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.trim().length).not.toBe(0);
            }
       });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function(){
            for(feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.trim().length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        
        /* A test that ensures the menu element is hidden by default. 
        */
        it('is hidden by default', function() {
            const isMenuHidden = document.querySelector('body').classList.contains('menu-hidden');
            expect(isMenuHidden).toBeDefined();
            expect(isMenuHidden).toBe(true);
        });

        /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * has two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('changes visibility when the menu icon is clicked', function() {
            const hamburgerIcon = document.querySelector('.menu-icon-link');

            //After first time click, the menu must be displayed, i.e. the menu is not hidden
            hamburgerIcon.click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);

            //After second click, the menu should be hidden
            hamburgerIcon.click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

    });

    describe('Initial entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('should be loaded in the feed', function(done){
            const feedElement = document.querySelector('.feed');
            /**
             * Check if Feed exists and has children nodes
             */
            expect(feedElement).toBeDefined();
            expect(feedElement.hasChildNodes()).toBe(true);
            expect(feedElement.childNodes.length).toBeGreaterThan(0);
            /**
             * Check if Entries exist
             */
            const entries = feedElement.querySelectorAll('.entry');
            expect(entries).toBeDefined();
            if(entries) {
                expect(entries.innerHTML.length).toBeGreaterThan(0);
            }
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                /**
                 * The HTML content of the current feed is saved in the first feed's callback and then the next feed is called.
                 */
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, done);
            });
        });

        it('loads new and different content', function(done) {
            /**
             * This function is the callback of the second feed. Here the first Feed's HTML is compared to 
             * check if the content has been actually changed.
             */
            expect(document.querySelector('.feed').innerHTML).not.toBe(firstFeed);
            done();
        });
    });
}());
