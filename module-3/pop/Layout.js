/**
 * Create Layout class, which represents a page of
 * the application, and
 * 
 * 1. It has a protractor locator (.locator),
 *    e.g. by.css("body")
 * 2. It has a URL (.url), e.g. "/home" or "https://epam.com"
 * 3. It has a name (.name), e.g. "Document Page"
 * 4. It cannot have a parent element
 * 5. It can have children Elements (.children)
 * 6. It has a method to retrieve the root protractor element
 *    by the locator (.get([name])) or a child element
 *    by name in any depth
 * 7. It has a method to load the page, i.e. Navigates to
 *    the URL of it (.load())
 */
'use strict';
const ElementFinder = require('../test/mock/ElementFinder');
const Browser = require('../test/mock/Browser');
const Protractor = require("protractor");

class Layout {
    constructor(name, url, locator) {
        this.locator = locator;
        this.url = url;
        this.name = name;
        this.parent = null;        
        this.children = {};        
    }
    setParent() {
        throw new Error();
    }
    addChildren(child) {
        if (this.children.hasOwnProperty(child.name)) {
            throw new Error(child.name + "is already added!");
        }        
       
        this.children[child.name] = child;
                   
    }

    get(name) {
        if (arguments.length === 0) {
            
            const root = Protractor.element(by.css(this.locator));
            return root;
        }
        else {
            if (this.children.hasOwnProperty(name)) {
               
                const element = Protractor.element(by.css(this.children[name].locator));
                return element;
            }
            else {
                throw new Error();
            }

        }


    }
    load(){
       
        return new Browser().get(this.url);
    }

}

module.exports = Layout;