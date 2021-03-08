'use strict';

const chakram = require('chakram');
const expect = chakram.expect;
const api = require('./utils/api');
const data = require('../server/data.json');

describe('Posts', () => {

    describe('Create', () => {
        let addedId;
        it('should add a new post', () => {
            return chakram.post(api.url('posts'), {
                title: 'title',
                body: 'body',
                userId: 1
            }).then(response => {
                expect(response.response.statusCode).to.match(/^20/);
                expect(response.body.data.id).to.be.defined;

                addedId = response.body.data.id;

                const post = chakram.get(api.url('posts/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.title', 'title');
                expect(post).to.have.json('data.body', 'body');
                expect(post).to.have.json('data.userId', 1);
                return chakram.wait();
            });
        });
        it('should not add a new row with existing ID', () => {
            const response = chakram.post(api.url('posts'), {
                id: 50,
                title: 'title',
                body: 'body',
                userId: 1
            });
            expect(response).to.have.status(500);
            return chakram.wait();
        });
        after(() => {
            if (addedId) {
                return chakram.delete(api.url('posts/' + addedId));
            }
        });
    });

    describe('Read', () => {
        it('return all the posts', () => {
            const response = chakram.get(api.url('posts'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', posts => {
                expect(posts).to.be.instanceof(Array);
                expect(posts.length).to.be.least(1);
            });
            return chakram.wait();
        });
        it('return the given posts', () => {
            const expectedPost = data.posts[0];
            const response = chakram.get(api.url('posts/' + expectedPost.id));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', post => {
                expect(post).to.eql(expectedPost);
            });
            return chakram.wait();
        });
        it('should not return a post with a non-existing id', () => {
            const response = chakram.get(api.url('posts/241111111111111132'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });

        describe('Filter', () => {
            it('should return a post by title', () => {
                const expectedTitle = data.posts[0];
                const response = chakram.get(api.url('posts?title=' + expectedTitle.title));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', post => {
                    expect(post[0]).to.eql(expectedTitle);
                });
                return chakram.wait();
            });
            it('should not return anything in case of impossible filter', () => {
                const response = chakram.get(api.url('posts?title=fgds32jhkl'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', post => {
                    expect(post).to.eql([]);
                });
                return chakram.wait();
            });
            it('should ignore filtering if invalid filter passed', () => {
                const response = chakram.get(api.url('posts?null=null'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.lengthOf(100);
                });
                return chakram.wait();
            });
        });

        describe('Paginate', () => {
            it('should return return 10 page by default if filtering for page', () => {
                const page = 10;
                const response = chakram.get(api.url('posts?_page=' + page));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.lengthOf(10);
                });
                return chakram.wait();
            });
            it('should return the lenght given by limit', () => {
                const lenght = 20;
                const page = 5;
                const response = chakram.get(api.url('posts?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.lengthOf(lenght);
                });
                return chakram.wait();
            });
            it('should not return anything if limit is too high', () => {
                const lenght = 20000;
                const page = 5;
                const response = chakram.get(api.url('posts?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.eql([]);
                });
                return chakram.wait();
            });
            it('should return 10 page if limit is invalid', () => {
                const lenght = "asdferw";
                const page = 2;
                const response = chakram.get(api.url('posts?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.lengthOf(10);
                });
                return chakram.wait();
            });
            it('should not return anything if page number is out of bounds', () => {
                const lenght = 20;
                const page = 20000;
                const response = chakram.get(api.url('posts?_page=' + page + '&_limit=' + lenght));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', post => {
                    expect(post).to.eql([]);
                });
                return chakram.wait();
            });
        });

        describe('sort', () => {
            it('should sort by the given parameter', () => {
                const response = chakram.get(api.url('posts?_sort=id'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    const ids = posts.map(post => post.id);
                    expect(ids).to.be.ascending;
                });
                return chakram.wait();
            });
            it('should sort by the given parameter in descending order if given', () => {
                const response = chakram.get(api.url('posts?_sort=id&_order=desc'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    const ids = posts.map(post => post.id);
                    expect(ids).to.be.descending;
                });
                return chakram.wait();
            });
            it('should ignore sort if the given parameter is invalid', () => {
                const response = chakram.get(api.url('posts?_sort=id'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    const ids = posts.map(post => post.id);
                    expect(ids).to.be.ascending;
                });
                return chakram.wait();
            });
        });

        describe('slice', () => {
            it('should slice the result by start and end paramater', () => {
                const start = 20;
                const end = 30;
                const sliceddata = data.posts.slice(start, end);
                const response = chakram.get(api.url('posts?_start=' + start + '&_end=' + end));
                expect(response).to.have.status(200);
                expect(response).to.have.header('X-Total-Count', '100');
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.eql(sliceddata);
                });
                return chakram.wait();
            });
            it('should not slice if start is invalid', () => {
                const start = -20;
                const end = 30;
                const response = chakram.get(api.url('posts?_start=' + start + '&_end=' + end));
                expect(response).to.have.status(200);
                expect(response).to.have.header('X-Total-Count', '100');
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.eql([]);
                });
                return chakram.wait();
            });
            it('should not slice if start is higher than end', () => {
                const start = 50;
                const end = 30;
                const response = chakram.get(api.url('posts?_start=' + start + '&_end=' + end));
                expect(response).to.have.status(200);
                expect(response).to.have.header('X-Total-Count', '100');
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.eql([]);
                });
                return chakram.wait();
            });
            it('should limit the end by total lenght if end is higher', () => {
                const start = 50;
                const end = 50000;
                const sliceddata = data.posts.slice(start, data.posts.length);
                const response = chakram.get(api.url('posts?_start=' + start + '&_end=' + end));
                expect(response).to.have.status(200);
                expect(response).to.have.header('X-Total-Count', '100');
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.eql(sliceddata);
                });
                return chakram.wait();
            });
        });

        describe('Operators', () => {
            describe('GTE', () => {
                it('should return id-s higher than the the given argument', () => {
                    const gte = 20;
                    const response = chakram.get(api.url('posts?id_gte=' + gte));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        const minId = Math.min.apply(Math, posts.map(post => post.id));
                        expect(minId).to.be.least(20);
                    });
                    return chakram.wait();
                });
                it('should return nothing if the gte value is invalid', () => {
                    const gte = 200;
                    const response = chakram.get(api.url('posts?id_gte=' + gte));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        expect(posts).to.eql([]);
                    });
                    return chakram.wait();
                });
            });
            describe('LTE', () => {
                it('should return id lower than the given argument', () => {
                    const lte = 20;
                    const response = chakram.get(api.url('posts?id_lte=' + lte));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        const maxId = Math.max.apply(Math, posts.map(post => post.id));
                        expect(maxId).to.be.most(20);
                    });
                    return chakram.wait();
                });
                it('should return nothing if the lte value is invalid', () => {
                    const lte = -200;
                    const response = chakram.get(api.url('posts?id_lte=' + lte));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        expect(posts).to.eql([]);
                    });
                    return chakram.wait();
                });
            });
            describe('exclude', () => {
                it('should exclude the stated posts from results', () => {
                    const exclude = 1;
                    const response = chakram.get(api.url('posts?id_ne=' + exclude));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        const ids = posts.map(post => post.id);
                        expect(ids).to.not.include(exclude);
                    });
                    return chakram.wait();
                });
                it('should return nothing if excluding in non existsing field', () => {
                    const exclude = 1;
                    const response = chakram.get(api.url('posts?gdfgd_ne=' + exclude));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', post => {
                        expect(post).to.eql([]);
                    });
                    return chakram.wait();
                });
            });

            describe('like', () => {
                it('should return post(s) if match found in the given argument', () => {
                    const like = 'voluptatem';
                    const expectedPost = data.posts.filter(post => {
                        return post.title.indexOf(like) > -1;
                    });
                    const response = chakram.get(api.url('posts?title_like=' + like));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        expect(posts).to.have.lengthOf(expectedPost.length);
                        expect(posts).to.eql(expectedPost);
                    });
                    return chakram.wait();
                });
                it('should return nothing if the field invalid', () => {
                    const like = 'voluptatem';
                    const response = chakram.get(api.url('posts?tasdfasdf_like=' + like));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        expect(posts).to.eql([]);
                    });
                    return chakram.wait();
                });
                it('should return nothing if no match found', () => {
                    const like = 'test';
                    const response = chakram.get(api.url('posts?title_like=' + like));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        expect(posts).to.eql([]);
                    });
                    return chakram.wait();
                });

            });
        });

        describe('full text search', () => {
            it('should return every post that contains the given text', () => {
                const like = 'voluptatem';
                const expectedPost = data.posts.filter(post => {
                    return (post.title.indexOf(like) > -1) || (post.body.indexOf(like) > -1);
                });
                const response = chakram.get(api.url('posts?q=' + like));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.have.lengthOf(expectedPost.length);
                    expect(posts).to.eql(expectedPost);
                });
                return chakram.wait();
            });
            it('should not retrun anything for invalid search', () => {
                const like = 'fasdf2342e34eadf';
                const response = chakram.get(api.url('posts?q=' + like));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.eql([]);
                });
                return chakram.wait();
            });
        });

        describe('Relationships', () => {
            it("should have embed comments for multiple posts", () => {
                const response = chakram.get(api.url('posts?_embed=comments'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.lengthOf(100);
                    posts.forEach(post => {
                        expect(post.comments).to.be.instanceof(Array);
                        post.comments.forEach(comment => {
                            expect(comment.postId).to.equal(post.id);
                        });
                    });
                });
                return chakram.wait();
            })
            it('should have embed comments for the given post', () => {
                const embedment = "comments"
                const response = chakram.get(api.url('posts/1?_embed=' + embedment));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', post => {
                    expect(post[embedment]).to.be.instanceof(Array);
                    post[embedment].forEach(comment => {
                        expect(comment.postId).to.equal(post.id);
                    });
                });
                return chakram.wait();
            });
            it('should return empty array if not valid embedment', () => {
                const embedment = "asdfaser4324"
                const response = chakram.get(api.url('posts/1?_embed=' + embedment));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', post => {
                    expect(post[embedment]).to.eql([]);
                });
                return chakram.wait();
            });
            it('should retrieve comments of a post', () => {
                const response = chakram.get(api.url('posts/1/comments'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', comments => {
                    expect(comments).to.be.instanceof(Array);
                    comments.forEach(comment => {
                        expect(comment.postId).to.equal(1);
                    });
                });
                return chakram.wait();
            });
        });
    });

    describe('Update', () => {
        const validUpdate = {
            title: "updated",
            body: "updatedbody",
            userId: 111
        };
        it('should update an existing post', () => {
            const response = chakram.put(api.url('posts/1'), validUpdate);
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', post => {
                expect(post.title).to.equal("updated");
                expect(post.body).to.equal("updatedbody");
                expect(post.userId).to.equal(111);
            });
            return chakram.wait();
        });
        it('should throw error if the post does not exist', () => {
            const response = chakram.put(api.url('posts/111'), {
                title: 'title',
                body: 'body',
                userId: 111
            });
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });

    describe('Delete', () => {
        it('should delete an existing post', () => {
            const response = chakram.delete(api.url('posts/1'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', data => {
                expect(data).to.eql({});
            });
            return chakram.wait();
        });
        it('should not delete a non-existing post', () => {
            const response = chakram.delete(api.url('posts/1111'));
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
    missing,invalid,long,special characters - userid
    missing,invalid,long,special characters - title
    missing,invalid,long,special characters - body    
    string,null,NaN - id
    updating with:
    missing,invalid,long,special characters - userid
    missing,invalid,long,special characters - title
    missing,invalid,long,special characters - body    
    string,null,NaN - post id
deleting

 */