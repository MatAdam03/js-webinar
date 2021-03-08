'use strict';

const chakram = require('chakram');
const expect = chakram.expect;
const api = require('./utils/api');
const data = require('../server/data.json');

describe('Users', () => {
    describe('Create', () => {
        let addedId;
        const testresultdata = () => {
            const post = chakram.get(api.url('users/' + addedId));
            expect(post).to.have.status(200);
            expect(post).to.have.json('data.id', addedId);
            expect(post).to.have.json('data.name', 'John Doe');
            expect(post).to.have.json('data.username', 'John');
            expect(post).to.have.json('data.email', 'John@testmail.mail');
            expect(post).to.have.json('data.address.street', 'Queens');
            expect(post).to.have.json('data.address.suite', 'Apt. 530');
            expect(post).to.have.json('data.address.city', 'London');
            expect(post).to.have.json('data.address.zipcode', '97768-3874');
            expect(post).to.have.json('data.address.geo.lat', "-37.3329");
            expect(post).to.have.json('data.address.geo.lng', "81.1496");
            expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
            expect(post).to.have.json('data.website', 'test.org');
            expect(post).to.have.json('data.company.name', 'London-news');
            expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
            expect(post).to.have.json('data.company.bs', 'Media');
        }
        it('should add a new valid user', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should create id when adding user with null id', () => {
            return chakram.post(api.url('users'), {
                id: null,
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with extra non schema field', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                nonvalidfield: 'nonvalid',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.json('data.nonvalidfield', 'nonvalid');
                return chakram.wait();
            });
        });
        it('should not add a new row with existing ID', () => {
            const response = chakram.post(api.url('users'), {
                id: "10",
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            });
            expect(response).to.have.status(500);
            return chakram.wait();
        });
        afterEach(() => {
            if (addedId) {
                return chakram.delete(api.url('users/' + addedId));
            }
        });
    });

    describe("Create with id cases", () => {
        let addedId;
        const testresultdata = () => {
            const post = chakram.get(api.url('users/' + addedId));
            expect(post).to.have.status(200);
            expect(post).to.have.json('data.id', addedId);
            expect(post).to.have.json('data.name', 'John Doe');
            expect(post).to.have.json('data.username', 'John');
            expect(post).to.have.json('data.email', 'John@testmail.mail');
            expect(post).to.have.json('data.address.street', 'Queens');
            expect(post).to.have.json('data.address.suite', 'Apt. 530');
            expect(post).to.have.json('data.address.city', 'London');
            expect(post).to.have.json('data.address.zipcode', '97768-3874');
            expect(post).to.have.json('data.address.geo.lat', "-37.3329");
            expect(post).to.have.json('data.address.geo.lng', "81.1496");
            expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
            expect(post).to.have.json('data.website', 'test.org');
            expect(post).to.have.json('data.company.name', 'London-news');
            expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
            expect(post).to.have.json('data.company.bs', 'Media');
        }
        it('should add a new valid user with string ID', () => {
            return chakram.post(api.url('users'), {
                id: "sdafsde",
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with special characters in id', () => {
            return chakram.post(api.url('users'), {
                id: "$ßß&@{",
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                testresultdata();
                return chakram.wait();
            });
        });        
        it('should create id for new user if id field is empty', () => {
            return chakram.post(api.url('users'), {
                id: "",
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add new user with long id', () => {
            return chakram.post(api.url('users'), {
                id: "111111111111111111111111111111111111111111111111111111111111111",
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                testresultdata();
                return chakram.wait();
            });
        });
        afterEach(() => {
            if (addedId) {
                return chakram.delete(api.url('users/' + addedId));
            }
        });
    });

    describe("Create with email cases", () => {
        let addedId;
        let addedEmail;
        const testresultdata = () => {
            const post = chakram.get(api.url('users/' + addedId));
            expect(post).to.have.status(200);
            expect(post).to.have.json('data.id', addedId);
            expect(post).to.have.json('data.name', 'John Doe');
            expect(post).to.have.json('data.username', 'John');
            expect(post).to.have.json('data.email', addedEmail);
            expect(post).to.have.json('data.address.street', 'Queens');
            expect(post).to.have.json('data.address.suite', 'Apt. 530');
            expect(post).to.have.json('data.address.city', 'London');
            expect(post).to.have.json('data.address.zipcode', '97768-3874');
            expect(post).to.have.json('data.address.geo.lat', "-37.3329");
            expect(post).to.have.json('data.address.geo.lng', "81.1496");
            expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
            expect(post).to.have.json('data.website', 'test.org');
            expect(post).to.have.json('data.company.name', 'London-news');
            expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
            expect(post).to.have.json('data.company.bs', 'Media');
        }
        it('should add a new valid user with non valid string email', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: 'JJJJJJJJJJJJJJJJJJJJ',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedEmail = response.body.data.email;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with non valid number email', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: '111111111111111111',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedEmail = response.body.data.email;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with non valid empty email', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: '',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedEmail = response.body.data.email;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user without email', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.name', 'John Doe');
                expect(post).to.have.json('data.username', 'John');
                expect(post).to.not.have.json('data.email');
                expect(post).to.have.json('data.address.street', 'Queens');
                expect(post).to.have.json('data.address.suite', 'Apt. 530');
                expect(post).to.have.json('data.address.city', 'London');
                expect(post).to.have.json('data.address.zipcode', '97768-3874');
                expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                expect(post).to.have.json('data.address.geo.lng', "81.1496");
                expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                expect(post).to.have.json('data.website', 'test.org');
                expect(post).to.have.json('data.company.name', 'London-news');
                expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                expect(post).to.have.json('data.company.bs', 'Media');
                return chakram.wait();
            });
        });
        it('should add a new valid user with long email', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedEmail = response.body.data.email;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with special charater only email', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: '$;}ß;<{}@@@@@@',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedEmail = response.body.data.email;
                testresultdata();
                return chakram.wait();
            });
        });
        afterEach(() => {
            if (addedId) {
                return chakram.delete(api.url('users/' + addedId));
            }
        });
    });

    describe("Create with name cases", () => {
        let addedId;
        let addedName;
        const testresultdata = () => {
            const post = chakram.get(api.url('users/' + addedId));
            expect(post).to.have.status(200);
            expect(post).to.have.json('data.id', addedId);
            expect(post).to.have.json('data.name', addedName);
            expect(post).to.have.json('data.username', 'John');
            expect(post).to.have.json('data.email', 'John@testmail.mail');
            expect(post).to.have.json('data.address.street', 'Queens');
            expect(post).to.have.json('data.address.suite', 'Apt. 530');
            expect(post).to.have.json('data.address.city', 'London');
            expect(post).to.have.json('data.address.zipcode', '97768-3874');
            expect(post).to.have.json('data.address.geo.lat', "-37.3329");
            expect(post).to.have.json('data.address.geo.lng', "81.1496");
            expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
            expect(post).to.have.json('data.website', 'test.org');
            expect(post).to.have.json('data.company.name', 'London-news');
            expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
            expect(post).to.have.json('data.company.bs', 'Media');
        }
        it('should add a new valid user with non valid string name', () => {
            return chakram.post(api.url('users'), {
                name: 'asdfßäđdf$Łvc.',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedName = response.body.data.name;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with non valid number name', () => {
            return chakram.post(api.url('users'), {
                name: '111111111111111111',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedName = response.body.data.name;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with non valid empty name', () => {
            return chakram.post(api.url('users'), {
                name: '',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedName = response.body.data.name;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user without name', () => {
            return chakram.post(api.url('users'), {
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.not.have.json('data.name');
                expect(post).to.have.json('data.username', 'John');
                expect(post).to.have.json('data.email', 'John@testmail.mail');
                expect(post).to.have.json('data.address.street', 'Queens');
                expect(post).to.have.json('data.address.suite', 'Apt. 530');
                expect(post).to.have.json('data.address.city', 'London');
                expect(post).to.have.json('data.address.zipcode', '97768-3874');
                expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                expect(post).to.have.json('data.address.geo.lng', "81.1496");
                expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                expect(post).to.have.json('data.website', 'test.org');
                expect(post).to.have.json('data.company.name', 'London-news');
                expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                expect(post).to.have.json('data.company.bs', 'Media');
                return chakram.wait();
            });
        });
        it('should add a new valid user with long name', () => {
            return chakram.post(api.url('users'), {
                name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedName = response.body.data.name;
                testresultdata();
                return chakram.wait();
            });
        });
        it('should add a new valid user with special charater only name', () => {
            return chakram.post(api.url('users'), {
                name: '$;}ß;<{}@@@@@@',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }

            }).then(response => {
                expect(response.response.statusCode).to.equal(201);
                expect(response.body.data.id).to.be.defined;
                addedId = response.body.data.id;
                addedName = response.body.data.name;
                testresultdata();
                return chakram.wait();
            });
        });
        afterEach(() => {
            if (addedId) {
                return chakram.delete(api.url('users/' + addedId));
            }
        });
    });

    describe("Create with address cases", () => {
        let addedId;
        describe("Address street cases", () => {
            let addedAddressStreet = {};
            const testresultdata = () => {
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.name', 'John Doe');
                expect(post).to.have.json('data.username', 'John');
                expect(post).to.have.json('data.email', 'John@testmail.mail');
                expect(post).to.have.json('data.address.street', addedAddressStreet);
                expect(post).to.have.json('data.address.suite', 'Apt. 530');
                expect(post).to.have.json('data.address.city', 'London');
                expect(post).to.have.json('data.address.zipcode', '97768-3874');
                expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                expect(post).to.have.json('data.address.geo.lng', "81.1496");
                expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                expect(post).to.have.json('data.website', 'test.org');
                expect(post).to.have.json('data.company.name', 'London-news');
                expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                expect(post).to.have.json('data.company.bs', 'Media');
            }
            it('should add a new valid user with non valid string street address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'ADŁł$łŁs23123',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressStreet = response.body.data.address.street;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid only number street address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: '1111111111111111111',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressStreet = response.body.data.address.street;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid empty string street address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: '',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressStreet = response.body.data.address.street;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user without street address field', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    const post = chakram.get(api.url('users/' + addedId));
                    expect(post).to.have.status(200);
                    expect(post).to.have.json('data.id', addedId);
                    expect(post).to.have.json('data.name', "John Doe");
                    expect(post).to.have.json('data.username', 'John');
                    expect(post).to.have.json('data.email', 'John@testmail.mail');
                    expect(post).to.not.have.json('data.address.street');
                    expect(post).to.have.json('data.address.suite', 'Apt. 530');
                    expect(post).to.have.json('data.address.city', 'London');
                    expect(post).to.have.json('data.address.zipcode', '97768-3874');
                    expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                    expect(post).to.have.json('data.address.geo.lng', "81.1496");
                    expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                    expect(post).to.have.json('data.website', 'test.org');
                    expect(post).to.have.json('data.company.name', 'London-news');
                    expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                    expect(post).to.have.json('data.company.bs', 'Media');
                    return chakram.wait();
                });
            });
            it('should add a new valid user with long string street address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressStreet = response.body.data.address.street;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid special character only street address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: '$$$$$$$$$$$$$$$$$$$',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressStreet = response.body.data.address.street;
                    testresultdata();
                    return chakram.wait();
                });
            });
            afterEach(() => {
                if (addedId) {
                    return chakram.delete(api.url('users/' + addedId));
                }
            });
        });
        describe("Address suite cases", () => {
            let addedAddressSuite = {};
            const testresultdata = () => {
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.name', 'John Doe');
                expect(post).to.have.json('data.username', 'John');
                expect(post).to.have.json('data.email', 'John@testmail.mail');
                expect(post).to.have.json('data.address.street', 'Queens');
                expect(post).to.have.json('data.address.suite', addedAddressSuite);
                expect(post).to.have.json('data.address.city', 'London');
                expect(post).to.have.json('data.address.zipcode', '97768-3874');
                expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                expect(post).to.have.json('data.address.geo.lng', "81.1496");
                expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                expect(post).to.have.json('data.website', 'test.org');
                expect(post).to.have.json('data.company.name', 'London-news');
                expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                expect(post).to.have.json('data.company.bs', 'Media');
            }
            it('should add a new valid user with non valid string address suite', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'fdasfa342asdfłŁííłŁ',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressSuite = response.body.data.address.suite;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid only number address suite', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: '11111111111111111',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressSuite = response.body.data.address.suite;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid empty address suite', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: '',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressSuite = response.body.data.address.suite;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with long address suite', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressSuite = response.body.data.address.suite;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid only special character address suite', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressSuite = response.body.data.address.suite;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user without address suite field', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        city: 'London',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    const post = chakram.get(api.url('users/' + addedId));
                    expect(post).to.have.status(200);
                    expect(post).to.have.json('data.id', addedId);
                    expect(post).to.have.json('data.name', "John Doe");
                    expect(post).to.have.json('data.username', 'John');
                    expect(post).to.have.json('data.email', 'John@testmail.mail');
                    expect(post).to.have.json('data.address.street', 'Queens');
                    expect(post).to.not.have.json('data.address.suite');
                    expect(post).to.have.json('data.address.city', 'London');
                    expect(post).to.have.json('data.address.zipcode', '97768-3874');
                    expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                    expect(post).to.have.json('data.address.geo.lng', "81.1496");
                    expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                    expect(post).to.have.json('data.website', 'test.org');
                    expect(post).to.have.json('data.company.name', 'London-news');
                    expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                    expect(post).to.have.json('data.company.bs', 'Media');
                    return chakram.wait();
                });
            });
            afterEach(() => {
                if (addedId) {
                    return chakram.delete(api.url('users/' + addedId));
                }
            });
        });
        describe("Address city cases", () => {
            let addedAddressCity = {};
            const testresultdata = () => {
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.name', 'John Doe');
                expect(post).to.have.json('data.username', 'John');
                expect(post).to.have.json('data.email', 'John@testmail.mail');
                expect(post).to.have.json('data.address.street', 'Queens');
                expect(post).to.have.json('data.address.suite', 'Apt. 530');
                expect(post).to.have.json('data.address.city', addedAddressCity);
                expect(post).to.have.json('data.address.zipcode', '97768-3874');
                expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                expect(post).to.have.json('data.address.geo.lng', "81.1496");
                expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                expect(post).to.have.json('data.website', 'test.org');
                expect(post).to.have.json('data.company.name', 'London-news');
                expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                expect(post).to.have.json('data.company.bs', 'Media');
            }
            it('should add a new valid user with non valid string city address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'A$Łsdf34',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressCity = response.body.data.address.city;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid number only city address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: '122312312312',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressCity = response.body.data.address.city;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid empty string city address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: '',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressCity = response.body.data.address.city;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with a long city address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressCity = response.body.data.address.city;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid number only city address', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'áááááááááááá$$$$$$$$$$$$$$$$$$$',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressCity = response.body.data.address.city;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user without city address field', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        zipcode: '97768-3874',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    const post = chakram.get(api.url('users/' + addedId));
                    expect(post).to.have.status(200);
                    expect(post).to.have.json('data.id', addedId);
                    expect(post).to.have.json('data.name', "John Doe");
                    expect(post).to.have.json('data.username', 'John');
                    expect(post).to.have.json('data.email', 'John@testmail.mail');
                    expect(post).to.have.json('data.address.street', 'Queens');
                    expect(post).to.have.json('data.address.suite', 'Apt. 530');
                    expect(post).to.not.have.json('data.address.city');
                    expect(post).to.have.json('data.address.zipcode', '97768-3874');
                    expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                    expect(post).to.have.json('data.address.geo.lng', "81.1496");
                    expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                    expect(post).to.have.json('data.website', 'test.org');
                    expect(post).to.have.json('data.company.name', 'London-news');
                    expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                    expect(post).to.have.json('data.company.bs', 'Media');
                    return chakram.wait();
                });
            });
            afterEach(() => {
                if (addedId) {
                    return chakram.delete(api.url('users/' + addedId));
                }
            });
        });
        describe("Address zipcode cases", () => {
            let addedAddressZipcode = {};
            const testresultdata = () => {
                const post = chakram.get(api.url('users/' + addedId));
                expect(post).to.have.status(200);
                expect(post).to.have.json('data.id', addedId);
                expect(post).to.have.json('data.name', 'John Doe');
                expect(post).to.have.json('data.username', 'John');
                expect(post).to.have.json('data.email', 'John@testmail.mail');
                expect(post).to.have.json('data.address.street', 'Queens');
                expect(post).to.have.json('data.address.suite', 'Apt. 530');
                expect(post).to.have.json('data.address.city', 'London');
                expect(post).to.have.json('data.address.zipcode', addedAddressZipcode);
                expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                expect(post).to.have.json('data.address.geo.lng', "81.1496");
                expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                expect(post).to.have.json('data.website', 'test.org');
                expect(post).to.have.json('data.company.name', 'London-news');
                expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                expect(post).to.have.json('data.company.bs', 'Media');
            };
            it('should add a new valid user with non valid string city zipcode', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: 'A$Łsdf34',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressZipcode = response.body.data.address.zipcode;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid number only city zipcode', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '111111111111',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressZipcode = response.body.data.address.zipcode;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid empty string city zipcode', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressZipcode = response.body.data.address.zipcode;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with a long city zipcode', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressZipcode = response.body.data.address.zipcode;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user with non valid special characters only city zipcode', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'London',
                        zipcode: '$$$$$$$$$$$$ŁŁ}}{{{{{{',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    addedAddressZipcode = response.body.data.address.zipcode;
                    testresultdata();
                    return chakram.wait();
                });
            });
            it('should add a new valid user without city zipcode field', () => {
                return chakram.post(api.url('users'), {
                    name: 'John Doe',
                    username: 'John',
                    email: 'John@testmail.mail',
                    address: {
                        street: 'Queens',
                        suite: 'Apt. 530',
                        city: 'London',
                        geo: {
                            lat: '-37.3329',
                            lng: '81.1496'
                        }
                    },
                    phone: '1-770-554-5341 x55552',
                    website: 'test.org',
                    company: {
                        name: 'London-news',
                        catchPhrase: 'Newspaper',
                        bs: 'Media'
                    }

                }).then(response => {
                    expect(response.response.statusCode).to.equal(201);
                    expect(response.body.data.id).to.be.defined;
                    addedId = response.body.data.id;
                    const post = chakram.get(api.url('users/' + addedId));
                    expect(post).to.have.status(200);
                    expect(post).to.have.json('data.id', addedId);
                    expect(post).to.have.json('data.name', "John Doe");
                    expect(post).to.have.json('data.username', 'John');
                    expect(post).to.have.json('data.email', 'John@testmail.mail');
                    expect(post).to.have.json('data.address.street', 'Queens');
                    expect(post).to.have.json('data.address.suite', 'Apt. 530');
                    expect(post).to.have.json('data.address.city', 'London');
                    expect(post).to.not.have.json('data.address.zipcode');
                    expect(post).to.have.json('data.address.geo.lat', "-37.3329");
                    expect(post).to.have.json('data.address.geo.lng', "81.1496");
                    expect(post).to.have.json('data.phone', '1-770-554-5341 x55552');
                    expect(post).to.have.json('data.website', 'test.org');
                    expect(post).to.have.json('data.company.name', 'London-news');
                    expect(post).to.have.json('data.company.catchPhrase', 'Newspaper');
                    expect(post).to.have.json('data.company.bs', 'Media');
                    return chakram.wait();
                });
            });
            afterEach(() => {
                if (addedId) {
                    return chakram.delete(api.url('users/' + addedId));
                }
            });
        });


    });

    describe('Read', () => {
        it('return all the users', () => {
            const response = chakram.get(api.url('users'));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', users => {
                expect(users).to.be.instanceof(Array);
                expect(users).to.have.lengthOf(10);
            });
            return chakram.wait();
        });
        it('return the given user', () => {
            const expectedUser = data.users[0];
            const response = chakram.get(api.url('users/' + expectedUser.id));
            expect(response).to.have.status(200);
            expect(response).to.have.json('data', user => {
                expect(user).to.eql(expectedUser);
            });
            return chakram.wait();
        });
        it('should not return a user with a non-existing id', () => {
            const response = chakram.get(api.url('users/241111111111111132'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });
        describe('Filter', () => {
            it('should return a user by name', () => {
                const expectedUser = data.users[0];
                const response = chakram.get(api.url('users?title=' + expectedUser.name));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', user => {
                    expect(user[0]).to.eql(expectedUser);
                });
                return chakram.wait();
            });
            it('should not return anything in case of non existant filter', () => {
                const response = chakram.get(api.url('users?name=fgds32jhkl'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', post => {
                    expect(post).to.eql([]);
                });
                return chakram.wait();
            });
            it('should ignore filtering if invalid field passed', () => {
                const response = chakram.get(api.url('users?null=null'));
                expect(response).to.have.status(200);
                expect(response).to.have.json('data', posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.lengthOf(10);
                });
                return chakram.wait();
            });

            //TODO paginate

            describe('sort', () => {
                it('should sort by the given parameter', () => {
                    const response = chakram.get(api.url('users?_sort=id'));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', users => {
                        const ids = users.map(user => user.id);
                        expect(ids).to.be.ascending;
                    });
                    return chakram.wait();
                });
                it('should sort by the given parameter in descending order if given', () => {
                    const response = chakram.get(api.url('users?_sort=id&_order=desc'));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', users => {
                        const ids = users.map(user => user.id);
                        expect(ids).to.be.descending;
                    });
                    return chakram.wait();
                });
                it('should ignore sort if the given parameter is invalid', () => {
                    const response = chakram.get(api.url('users?_sort=asdfasdf'));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', users => {
                        const ids = users.map(user => user.id);
                        expect(ids).to.be.ascending;
                    });
                    return chakram.wait();
                });
            });

            describe('slice', () => {
                it('should slice the result by start and end paramater', () => {
                    const start = 2;
                    const end = 5;
                    const sliceddata = data.users.slice(start, end);
                    const response = chakram.get(api.url('users?_start=' + start + '&_end=' + end));
                    expect(response).to.have.status(200);
                    expect(response).to.have.header('X-Total-Count', '10');
                    expect(response).to.have.json('data', users => {
                        expect(users).to.eql(sliceddata);
                    });
                    return chakram.wait();
                });
                it('should return empty if start is higher than last element', () => {
                    const start = 200;
                    const end = 5;
                    const response = chakram.get(api.url('users?_start=' + start + '&_end=' + end));
                    expect(response).to.have.status(200);
                    expect(response).to.have.header('X-Total-Count', '10');
                    expect(response).to.have.json('data', users => {
                        expect(users).to.eql([]);
                    });
                    return chakram.wait();
                });
                it('should slice from first user if start is smaller than 0', () => {
                    const start = -20;
                    const end = 30;
                    const sliceddata = data.users.slice(0, end);
                    const response = chakram.get(api.url('users?_start=' + start + '&_end=' + end));
                    expect(response).to.have.status(200);
                    expect(response).to.have.header('X-Total-Count', '10');
                    expect(response).to.have.json('data', users => {
                        expect(users).to.eql(sliceddata);
                    });
                    return chakram.wait();
                });
                it('should not slice if start is higher than end', () => {
                    const start = 50;
                    const end = 30;
                    const response = chakram.get(api.url('users?_start=' + start + '&_end=' + end));
                    expect(response).to.have.status(200);
                    expect(response).to.have.header('X-Total-Count', '10');
                    expect(response).to.have.json('data', users => {
                        expect(users).to.eql([]);
                    });
                    return chakram.wait();
                });
                it('should limit the end by total lenght if end is higher', () => {
                    const start = 1;
                    const end = 50000;
                    const sliceddata = data.users.slice(start, data.posts.length);
                    const response = chakram.get(api.url('users?_start=' + start + '&_end=' + end));
                    expect(response).to.have.status(200);
                    expect(response).to.have.header('X-Total-Count', '10');
                    expect(response).to.have.json('data', users => {
                        expect(users).to.eql(sliceddata);
                    });
                    return chakram.wait();
                });
            });

            describe('Operators', () => {
                describe('GTE', () => {
                    it('should return id-s higher than the the given argument', () => {
                        const gte = 5;
                        const response = chakram.get(api.url('users?id_gte=' + gte));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            const minId = Math.min.apply(Math, users.map(user => user.id));
                            expect(minId).to.be.least(5);
                        });
                        return chakram.wait();
                    });
                    it('should return nothing if the gte value is higher than max id', () => {
                        const gte = 200;
                        const response = chakram.get(api.url('users?id_gte=' + gte));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            expect(users).to.eql([]);
                        });
                        return chakram.wait();
                    });
                });
                describe('LTE', () => {
                    it('should return id lower than the given argument', () => {
                        const lte = 20;
                        const response = chakram.get(api.url('users?id_lte=' + lte));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            const maxId = Math.max.apply(Math, users.map(user => user.id));
                            expect(maxId).to.be.most(20);
                        });
                        return chakram.wait();
                    });
                    it('should return nothing if the lte value is lower than minimum id', () => {
                        const lte = -200;
                        const response = chakram.get(api.url('users?id_lte=' + lte));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            expect(users).to.eql([]);
                        });
                        return chakram.wait();
                    });
                });
                describe('exclude', () => {
                    it('should exclude the stated users from results', () => {
                        const exclude = 1;
                        const response = chakram.get(api.url('users?id_ne=' + exclude));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            const ids = users.map(user => user.id);
                            expect(ids).to.not.include(exclude);
                        });
                        return chakram.wait();
                    });
                    it('should return nothing if excluding in non existsing field', () => {
                        const exclude = 1;
                        const response = chakram.get(api.url('users?gdfgd_ne=' + exclude));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', user => {
                            expect(user).to.eql([]);
                        });
                        return chakram.wait();
                    });
                });

                describe('like', () => {
                    it('should return user(s) if match found in the given field', () => {
                        const like = 'Sincere@april.biz';
                        const expectedUser = data.users.filter(user => {
                            return user.email.indexOf(like) > -1;
                        });
                        const response = chakram.get(api.url('users?email_like=' + like));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            expect(users).to.have.lengthOf(expectedUser.length);
                            expect(users).to.eql(expectedUser);
                        });
                        return chakram.wait();
                    });
                    it('should return nothing if the field invalid', () => {
                        const like = 'Sincere@april.biz';
                        const response = chakram.get(api.url('users?tasdfasdf_like=' + like));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            expect(users).to.eql([]);
                        });
                        return chakram.wait();
                    });
                    it('should return nothing if no match found', () => {
                        const like = 'test';
                        const response = chakram.get(api.url('users?email_like=' + like));
                        expect(response).to.have.status(200);
                        expect(response).to.have.json('data', users => {
                            expect(users).to.eql([]);
                        });
                        return chakram.wait();
                    });

                });
            });

            describe('full text search', () => {
                it('should return every post that contains the given text', () => {
                    const like = '.net';
                    const expectedPost = data.users.filter(user => {
                        return (user.name.indexOf(like) > -1) || (user.username.indexOf(like) > -1) || (user.email.indexOf(like) > -1) || (user.address.street.indexOf(like) > -1)
                            || (user.address.suite.indexOf(like) > -1)
                            || (user.address.city.indexOf(like) > -1)
                            || (user.address.zipcode.indexOf(like) > -1)
                            || (user.address.geo.lat.indexOf(like) > -1)
                            || (user.address.geo.lng.indexOf(like) > -1)
                            || (user.phone.indexOf(like) > -1)
                            || (user.website.indexOf(like) > -1)
                            || (user.company.name.indexOf(like) > -1)
                            || (user.company.catchPhrase.indexOf(like) > -1)
                            || (user.company.bs.indexOf(like) > -1);
                    });
                    const response = chakram.get(api.url('users?q=' + like));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', users => {
                        expect(users).to.have.lengthOf(expectedPost.length);
                        expect(users).to.eql(expectedPost);
                    });
                    return chakram.wait();
                });
                it('should not retrun anything if no result search', () => {
                    const like = 'fasdf2342e34eadf';
                    const response = chakram.get(api.url('users?q=' + like));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', users => {
                        expect(users).to.eql([]);
                    });
                    return chakram.wait();
                });
            });

            describe('Relationships', () => {
                it("should have embed posts for multiple users", () => {
                    const response = chakram.get(api.url('users?_embed=posts'));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', users => {
                        expect(users).to.be.instanceof(Array);
                        expect(users).to.have.lengthOf(10);
                        users.forEach(user => {
                            expect(user.posts).to.be.instanceof(Array);
                            user.posts.forEach(post => {
                                expect(post.userId).to.equal(user.id);
                            });
                        });
                    });
                    return chakram.wait();
                })
                it('should have embed comments for the given post', () => {
                    const embedment = "posts"
                    const response = chakram.get(api.url('users/1?_embed=' + embedment));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', user => {
                        expect(user[embedment]).to.be.instanceof(Array);
                        user[embedment].forEach(post => {
                            expect(post.userId).to.equal(user.id);
                        });
                    });
                    return chakram.wait();
                });
                it('should return empty array if not valid embedment', () => {
                    const embedment = "asdfaser4324"
                    const response = chakram.get(api.url('users/1?_embed=' + embedment));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', user => {
                        expect(user[embedment]).to.eql([]);
                    });
                    return chakram.wait();
                });
                it('should retrieve posts of a user', () => {
                    const response = chakram.get(api.url('users/1/posts'));
                    expect(response).to.have.status(200);
                    expect(response).to.have.json('data', posts => {
                        expect(posts).to.be.instanceof(Array);
                        posts.forEach(post => {
                            expect(post.userId).to.equal(1);
                        });
                    });
                    return chakram.wait();
                });
            });
        });
    });

    describe('Update', () => {
        it('Should update existing post with given data', () => {
            const response = chakram.put(api.url('users/5'), {
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }
            });
            expect(response).to.have.status(200);
            return response.then(data => {
                const user = chakram.get(api.url('users/5'));
                expect(user).to.have.json('data', data => {
                    expect(data.name).to.equal('John Doe');
                    expect(data.username).to.equal('John');
                    expect(data.email).to.equal('John@testmail.mail');
                    expect(data.address.street).to.equal('Queens');
                    expect(data.address.suite).to.equal('Apt. 530');
                    expect(data.address.city).to.equal('London');
                    expect(data.address.zipcode).to.equal('97768-3874');
                    expect(data.address.geo.lat).to.equal('-37.3329');
                    expect(data.address.geo.lng).to.equal('81.1496');
                    expect(data.phone).to.equal('1-770-554-5341 x55552');
                    expect(data.website).to.equal('test.org');
                    expect(data.company.name).to.equal('London-news');
                    expect(data.company.catchPhrase).to.equal('Newspaper');
                    expect(data.company.bs).to.equal('Media');
                });
                return chakram.wait();
            });
        });
        it('Should throw error if user does not exists', () => {
            const response = chakram.put(api.url('users/500'), {
                name: 'John Doe',
                username: 'John',
                email: 'John@testmail.mail',
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                },
                phone: '1-770-554-5341 x55552',
                website: 'test.org',
                company: {
                    name: 'London-news',
                    catchPhrase: 'Newspaper',
                    bs: 'Media'
                }
            });
            expect(response).to.have.status(404);
            return chakram.wait();
        });
        it('Should only update the given fields', () => {
            const response = chakram.put(api.url('users/5'), {
                address: {
                    street: 'Queens',
                    suite: 'Apt. 530',
                    city: 'London',
                    zipcode: '97768-3874',
                    geo: {
                        lat: '-37.3329',
                        lng: '81.1496'
                    }
                }
            });
            expect(response).to.have.status(200);
            return response.then(data => {
                const user = chakram.get(api.url('users/5'));
                expect(user).to.have.json('data', data => {
                    expect(data.address.street).to.equal('Queens');
                    expect(data.address.suite).to.equal('Apt. 530');
                    expect(data.address.city).to.equal('London');
                    expect(data.address.zipcode).to.equal('97768-3874');
                    expect(data.address.geo.lat).to.equal('-37.3329');
                    expect(data.address.geo.lng).to.equal('81.1496');
                });
                return chakram.wait();
            });
        });
        it('Should update with empty strings', () => {
            const response = chakram.put(api.url('users/5'), {
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: {
                        lat: '',
                        lng: ''
                    }
                }
            });
            expect(response).to.have.status(200);
            return response.then(data => {
                const user = chakram.get(api.url('users/5'));
                expect(user).to.have.json('data', data => {
                    expect(data.address.street).to.equal('');
                    expect(data.address.suite).to.equal('');
                    expect(data.address.city).to.equal('');
                    expect(data.address.zipcode).to.equal('');
                    expect(data.address.geo.lat).to.equal('');
                    expect(data.address.geo.lng).to.equal('');
                });
                return chakram.wait();
            });
        });
        it('Should update with special charaters', () => {
            const response = chakram.put(api.url('users/5'), {
                name: "ßßßßßßßßß$$$$"
            });
            expect(response).to.have.status(200);
            return response.then(data => {
                const user = chakram.get(api.url('users/5'));
                expect(user).to.have.json('data', data => {
                    expect(data.name).to.equal("ßßßßßßßßß$$$$");
                });
                return chakram.wait();
            });
        });
    });

    describe('Delete', () => {
        it('should delete post by ID', () => {
            const response = chakram.delete(api.url('users/5'));
            expect(response).to.have.status(200);
            return response.then(data => {
                const post = chakram.get(api.url('users/5'));
                expect(post).to.have.status(404);
                return chakram.wait();
            });
        });
        it('should throw error if the post does not exist', () => {
            const response = chakram.delete(api.url('users/111'));
            expect(response).to.have.status(404);
            return chakram.wait();
        });
    });
});