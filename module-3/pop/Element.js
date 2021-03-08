/**
 * Create Element class, which represents an element of
 * the application, and
 * 
 * 1. It has a protractor locator (.locator),
 *    e.g. by.css("h1.title")
 * 2. It has a name (.name), e.g. "Document Title"
 * 3. It can have a parent Element, 
 *    which is the context of the element (.parent)
 * 4. It can have children Elements (.children)
 * 5. It has a method to retrieve the protractor element
 *    by the locator (.get([name])) in it's context
 *     - if it gets a name as parameter, it tries to find
 *       in it's children (recursively) the Element with
 *       the given name or throws an Erorr if it cannot
 *       find the element
 */
'use strict';
const { element } = require('../test/mock/ElementFinder');
const Protractor = require("protractor");
const ElementFinder = require('../test/mock/ElementFinder');
class Element {
    constructor(name, locator) {
        this.locator = locator;
        this.name = name;
        this.parent = null;
        this.children = {};

    }

    setParent(parent) {
        this.parent = parent;
    }
    addChildren(child) {
        if (this.children.hasOwnProperty(child.name)) {
            throw new Error(child.name + "is already added!");
        }
        this.children[child.name] = child;
    }
    get(name, depth = 0) {
        let root;
        if (arguments.length === 0) {
            return Protractor.element(by.css(this.locator.css));
        }
        else {
            for (const [key, value] of Object.entries(this.children)) {
                if (value.name === name) {
                    return Protractor.element(by.css(value.locator.css));
                }
                else if (Object.entries(this.children[key].children).length !== 0) {
                    let tmp = this.children[key].get(name, depth + 1);
                    if (tmp) {
                        root = tmp;
                    }

                }

            }

        }
        if (depth === 0 && !root) {
            throw new Error("not found");
        }
        return root;


    }
}

module.exports = Element;