'use strict';

const chakram = require('chakram');
const expect = chakram.expect;
const api = require('./utils/api');
const data = require('../server/data.json');

describe('Comments', () => {
    describe('Create', () => {
        let addedId;
        it('should add a new comments', () => {
            return chakram.post(api.url('comments'), {
                postId: 6,
                name: "Randomname",
                email: "Johndoe@email.com",
                body: "randomtextrandomtextrandomtextrandomtext"
            }).then(response => {
                expect(response.response.statusCode).to.match(/^20/);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const comment = chakram.get(api.url('comments/' + addedId));
                expect(comment).to.have.status(200);
                expect(comment).to.have.json('data.id', addedId);
                expect(comment).to.have.json('data.postId', 6);
                expect(comment).to.have.json('data.body', 'randomtextrandomtextrandomtextrandomtext');
                return chakram.wait();
            });
        });
        it('should not add a new row with existing ID', () => {
            const response = chakram.post(api.url('comments'), {
                postId: 6,
                id: 6,
                name: "Randomname",
                email: "Johndoe@email.com",
                body: "randomtextrandomtextrandomtextrandomtext"
            });
            expect(response).to.have.status(500);
            return chakram.wait();
        });
        after(() => {
            if (addedId) {
                return chakram.delete(api.url('comments/' + addedId));
            }
        });
    });
    describe('Read', () => {
        it('return all the comments', () => {
            const response = chakram.get(api.url('comments'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', comments => {
                expect(comments).to.be.instanceof(Array);
                expect(comments.length).to.be.least(1);
            });
            return chakram.wait();
        });
        it('return the given comments', () => {
            const expectedComment = data.comments[0];
            const response = chakram.get(api.url('comments/1'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', comment => {
                expect(comment).to.eql(expectedComment)
            });
            return chakram.wait();
        });
        it('should not return a comment with a non-existing id', () => {
            const response = chakram.get(api.url('comments/241111111111111132'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
    describe('Update', () => {
        const validUpdate = {
            postId: 6,
            name: "Randomname",
            email: "Johndoe@email.com",
            body: "randomtextrandomtextrandomtextrandomtext"
        };
        it('should update an existing comment', () => {
            const response = chakram.put(api.url('comments/1'), validUpdate);
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', comment => {
                expect(comment.name).to.equal('Randomname');
                expect(comment.email).to.equal('Johndoe@email.com');
                expect(comment.body).to.equal('randomtextrandomtextrandomtextrandomtext');
                expect(comment.postId).to.equal(6);
            });
            return chakram.wait();
        });
        it('should throw error if the post does not exist', () => {
            const response = chakram.put(api.url('comments/1111111'), validUpdate);
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
    describe('Delete', () => {
        it('should delete an existing comment', () => {
            const response = chakram.delete(api.url('comments/1'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', data => {
                const comment = chakram.get(api.url('comments/1'));
                expect(comment).to.have.status(404);
                return chakram.wait();
            });
            return chakram.wait();
        });
        it('should not delete a non-existing comment', () => {
            const response = chakram.delete(api.url('comments/11111'));
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
    missing,invalid,long,special characters - name
    missing,invalid,long,special characters - email
    missing,invalid,long,special characters - body    
    string,null,NaN - post id
  
  filtering,
paginating,
sorting,
embed,

    updating with:
    missing,invalid,long,special characters - name
    missing,invalid,long,special characters - email
    missing,invalid,long,special characters - body    
    string,null,NaN - post id
deleting

 */