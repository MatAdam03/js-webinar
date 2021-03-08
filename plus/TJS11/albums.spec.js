'use strict';

const chakram = require('chakram');
const expect = chakram.expect;
const api = require('./utils/api');
const data = require('../server/data.json');



describe('Albums', () => {
    describe('Create', () => {
        let addedId;
        it('should add a new album', () => {
            return chakram.post(api.url('albums'), {
                title: 'title',
                userId: 1
            }).then(response => {
                expect(response.response.statusCode).to.match(/^20/);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const post = chakram.get(api.url('albums/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.title', 'title');
                expect(post).to.have.json('data.userId', 1);
                return chakram.wait();
            });
        });
        it('should not add a new row with existing ID', () => {
            const response = chakram.post(api.url('albums'), {
                id: 2,
                title: 'title',
                userId: 1
            });
            expect(response).to.have.status(500);
            return chakram.wait();
        });
        after(() => {
            if (addedId) {
                return chakram.delete(api.url('albums/' + addedId));
            }
        });
    });

    describe('Read', () => {

        it('return all the albums', () => {
            const response = chakram.get(api.url('albums'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', albums => {
                expect(albums).to.be.instanceof(Array);
                expect(albums.length).to.be.least(1);
            });
            return chakram.wait();
        });
        it('return the given album', () => {
            const expectedAlbum = data.albums[0];
            const response = chakram.get(api.url('albums/' + expectedAlbum.id));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', album => {
                expect(album).to.eql(expectedAlbum);
            });
            return chakram.wait();
        });
        it('should not return an album with a non-existing id', () => {
            const response = chakram.get(api.url('albums/241111111111111132'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });

    describe('Update', () => {
        const validUpdate = {
            title: "updated",
            userId: 111
        };
        it('should update an existing album', () => {
            const response = chakram.put(api.url('albums/1'), validUpdate);
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', post => {
                expect(post.title).to.equal("updated");
                expect(post.userId).to.equal(111);
            });
            return chakram.wait();
        });
        it('should throw error if the album does not exist', () => {
            const response = chakram.put(api.url('albums/111'), {
                title: 'title',
                userId: 111
            });
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });

    describe('Delete', () => {
        let addedId;
        it('should add a new album to delete', () => {
            return chakram.post(api.url('albums'), {
                title: 'title',
                userId: 1
            }).then(response => {
                expect(response.response.statusCode).to.match(/^20/);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const post = chakram.get(api.url('albums/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.title', 'title');
                expect(post).to.have.json('data.userId', 1);
                return chakram.wait();
            });
        });
        it('should delete added album', () => {
            const response = chakram.delete(api.url('albums/' + addedId));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', data => {
                const album = chakram.get(api.url('albums/' + addedId));
                expect(album).to.have.status(404);
                return chakram.wait();
            });
            return chakram.wait();
        });
        it('should not delete a non-existing album', () => {
            const response = chakram.delete(api.url('albums/1111'));
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
    missing fields
    special characters
    long strings
    non existing user id,
    non valid user id,
filtering,
paginating,
    updating with:
    missing parameters,
    invalid characters,
    long/empty strings,
deleting

 */