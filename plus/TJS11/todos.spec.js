'use strict';

const chakram = require('chakram');
const expect = chakram.expect;
const api = require('./utils/api');
const data = require('../server/data.json');

describe('Todos', () => {
    describe('Create', () => {
        let addedId;
        it('should add a new todo', () => {
            return chakram.post(api.url('todos'), {
                title: 'title',
                userId: 1,
                completed: false
            }).then(response => {
                expect(response.response.statusCode).to.match(/^20/);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const post = chakram.get(api.url('todos/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.title', 'title');
                expect(post).to.have.json('data.userId', 1);
                expect(post).to.have.json('data.completed', false);
                return chakram.wait();
            });
        });
        it('should not add a new todo with existing ID', () => {
            const response = chakram.post(api.url('albums'), {
                id: 2,
                title: 'title',
                userId: 1,
                completed: false
            });
            expect(response).to.have.status(500);
            return chakram.wait();
        });
        after(() => {
            if (addedId) {
                return chakram.delete(api.url('todos/' + addedId));
            }
        });
    });

    describe('Read', () => {
        it('return all the todos', () => {
            const response = chakram.get(api.url('todos'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', todos => {
                expect(todos).to.be.instanceof(Array);
                expect(todos.length).to.be.least(1);
            });
            return chakram.wait();
        });
        it('return the given todo', () => {
            const expectedTodo = data.todos[0];
            const response = chakram.get(api.url('todos/' + expectedTodo.id));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', todo => {
                expect(todo).to.eql(expectedTodo);
            });
            return chakram.wait();
        });
        it('should not return an todo with a non-existing id', () => {
            const response = chakram.get(api.url('todos/241111111111111132'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
    describe('Update', () => {
        const validUpdate = {
            title: "updated",
            userId: 1,
            completed: true
        };
        it('should update an existing todo', () => {
            const response = chakram.put(api.url('todos/1'), validUpdate);
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', post => {
                expect(post.title).to.equal("updated");
                expect(post.userId).to.equal(1);
                expect(post.completed).to.equal(true);
            });
            return chakram.wait();
        });
        it('should throw error if the todo does not exist', () => {
            const response = chakram.put(api.url('todos/2200'), {
                title: 'title',
                userId: 1,
                completed: true,
            });
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
    describe('Delete', () => {
        it('should delete an existing todo', () => {
            const response = chakram.delete(api.url('todos/1'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', data => {
                const todo = chakram.get(api.url('todos/1'));
                expect(todo).to.have.status(404);
                return chakram.wait();
            });
            return chakram.wait();
        });
        it('should not delete a non-existing post', () => {
            const response = chakram.delete(api.url('todos/1111'));
            expect(response).to.have.status(404);
            expect(response).to.have.json('data', data => {
                expect(data).to.eql({});
            });
            return chakram.wait();
        });
    });
});


//TODO
/* Test cases for creating with:
    missing,invalid,long,special characters - user id
    missing,invalid,long,special characters - title
    string,null,NaN - completed    
  
  filtering,
paginating,
sorting,
embed,

    updating with:
    missing,invalid,long,special characters - user id
    missing,invalid,long,special characters - title
    string,null,NaN - completed   
deleting

 */