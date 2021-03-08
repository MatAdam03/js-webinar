'use strict';

const chakram = require('chakram');
const expect = chakram.expect;
const api = require('./utils/api');
const data = require('../server/data.json');

describe('Photos', () => {
    describe('Create', () => {
        let addedId;

        it('should add a new photo', () => {
            return chakram.post(api.url('photos'), {
                albumId: 4,
                title: 'body',
                url: "placeholder.com",
                thumbnailUrl: "placeholderthumb.com"
            }).then(response => {
                expect(response.response.statusCode).to.match(/^20/);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const photo = chakram.get(api.url('photos/' + addedId));
                expect(photo).to.have.status(200);
                expect(photo).to.have.json('data.id', addedId);
                expect(photo).to.have.json('data.title', 'body');
                expect(photo).to.have.json('data.url', 'placeholder.com');
                expect(photo).to.have.json('data.thumbnailUrl', 'placeholderthumb.com');
                return chakram.wait();
            });
        });

        it('should not add a new photo with existing ID', () => {
            const response = chakram.post(api.url('photos'), {
                id: 52,
                albumId: 4,
                title: 'body',
                url: "placeholder.com",
                thumbnailUrl: "placeholderthumb.com"
            });
            expect(response).to.have.status(500);
            return chakram.wait();
        });

        after(() => {
            if (addedId) {
                return chakram.delete(api.url('photos/' + addedId));
            }
        });
    });
    describe('Read', () => {
        it('return all the photos', () => {

            const response = chakram.get(api.url('photos'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', photos => {
                expect(photos).to.be.instanceof(Array);
                expect(photos.length).to.be.least(1);
            });
            return chakram.wait();
        });
        it('return the given photo', () => {
            const expectedPhoto = data.photos[550];
            const response = chakram.get(api.url('photos/' + expectedPhoto.id));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', photo => {
                expect(photo).to.eql(expectedPhoto);
            });
            return chakram.wait();
        });
        it('should not return a photo with a non-existing id', () => {
            const response = chakram.get(api.url('photos/241111111111111132'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });

        describe('Paginate', () => {
            it('should return return 10 page by default if filtering for page', () => {
                const page = 10;
                const response = chakram.get(api.url('photos?_page=' + page));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', photos => {
                    expect(photos).to.be.instanceof(Array);
                    expect(photos).to.have.lengthOf(10);
                });
                return chakram.wait();
            });
            it('should return the lenght given by limit', () => {
                const lenght = 20;
                const page = 5;
                const response = chakram.get(api.url('photos?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', photos => {
                    expect(photos).to.be.instanceof(Array);
                    expect(photos).to.have.lengthOf(lenght);
                });
                return chakram.wait();
            });
            it('should not return anything if limit is too high', () => {
                const lenght = 20000;
                const page = 5;
                const response = chakram.get(api.url('photos?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', photos => {
                    expect(photos).to.eql([]);
                });
                return chakram.wait();
            });
            it('should return 10 page if limit is invalid', () => {
                const lenght = "asdferw";
                const page = 2;
                const response = chakram.get(api.url('photos?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', photos => {
                    expect(photos).to.be.instanceof(Array);
                    expect(photos).to.have.lengthOf(10);
                });
                return chakram.wait();
            });
            it('should not return anything if page number is out of bounds', () => {
                const lenght = 20;
                const page = 20000;
                const response = chakram.get(api.url('photos?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', photos => {
                    expect(photos).to.eql([]);
                });
                return chakram.wait();
            });
        });
    });
    describe('Update', () => {
        const validUpdate = {
            title: "updated",
            url: "updateurl",
            thumbnailUrl: "updatedthumbnailurl",
            albumId: 2
        };
        it('should update an existing photo', () => {
            const response = chakram.put(api.url('photos/51'), validUpdate);
            expect(response).to.have.status(200);
            return response.then(data => {
                const photo = chakram.get(api.url('photos/51'));
                expect(photo).to.have.json('data', data => {
                    expect(data.title).to.equal('updated');
                    expect(data.url).to.equal('updateurl');
                    expect(data.thumbnailUrl).to.equal('updatedthumbnailurl');
                    expect(data.albumId).to.equal(2);

                });
                return chakram.wait();
            });
        });
        it('should throw error if the album does not exist', () => {
            const response = chakram.put(api.url('photos/4444444444444'), validUpdate);
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
    describe('Delete', () => {
        it('should delete photo by ID', () => {
            const response = chakram.delete(api.url('photos/500'));
            expect(response).to.have.status(200);
            return response.then(data => {
                const post = chakram.get(api.url('photos/500'));
                expect(post).to.have.status(404);
                return chakram.wait();
            });
        });

        it('should throw error if the photo does not exist', () => {
            const response = chakram.delete(api.url('photos/1100000001'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
});


//TODO
/* Test cases for creating with:
    missing,invalid,long,special characters - title
    missing,invalid,long,special characters - url
    missing,invalid,long,special characters - thumbnail
    missing,invalid,long,special characters - thumbnail url
    string,null,NaN -album id
  
  filtering,
paginating,
sorting,
embed,

    updating with:
    issing,invalid,long,special characters - title
    missing,invalid,long,special characters - url
    missing,invalid,long,special characters - thumbnail
    missing,invalid,long,special characters - thumbnail url
    string,null,NaN -album id 
deleting

 */