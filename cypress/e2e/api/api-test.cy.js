describe('API Testing for reqres', () => {
  
    it('Validate List Users', () => {
      cy.request('GET',`/api/users?page=2`,).then((response) => {
          expect(response.status).to.eq(200);
            
          expect(response.duration).to.be.lessThan(500);
  
          const responseBody = JSON.stringify(response.body);
          expect(responseBody).to.include('Michael');
  
          expect(response.body.total_pages).to.eq(2);

          const jsonData = response.body;
          expect(jsonData.data[0].email).to.include('@');

          jsonData.data.forEach((user) => {
            expect(user.avatar.startsWith('https://')).to.be.true;
          });

          expect(jsonData.support.url).to.be.a('string').that.is.not.empty;

          expect(jsonData.total_pages).to.be.a('number');
      });
    });

    it('Validate Single Users', () => {
        cy.request('GET',`/api/users/2`,).then((response) => {
          expect(response.status).to.eq(200);
    
          expect(response.duration).to.be.lessThan(500);
    
          const responseBody = JSON.stringify(response.body);
          expect(responseBody).to.include('Janet');
  
          const jsonData = response.body;
          expect(jsonData.data.email).to.include('@');

          expect(jsonData.data.id).to.eq(2);

          expect(jsonData.data.avatar.startsWith('https://')).to.be.true;
  
          expect(jsonData.support.url).to.be.a('string').that.is.not.empty;
  
        });
    });

    it('Validate Single Users Not Found', () => {
        cy.request({method: 'GET',url: '/api/users/23', failOnStatusCode: false }).then((response) => {
          expect(response.status).to.eq(404);
    
          expect(response.duration).to.be.lessThan(500);
    
          expect(response.body).to.be.empty;
  
        });
    });

    it('Validate List <resource>', () => {
      cy.request('GET',`/api/unknown`,).then((response) => {
          expect(response.status).to.eq(200);
            
          expect(response.duration).to.be.lessThan(500);
  
          const responseBody = JSON.stringify(response.body);
          expect(responseBody).to.include('cerulean');
  
          expect(response.body.total_pages).to.eq(2);

          const jsonData = response.body;
          expect(jsonData.data[0].year).to.eq(2000);

          expect(jsonData.support.url).to.be.a('string').that.is.not.empty;

          expect(jsonData.total_pages).to.be.a('number');
      });
    });

    it('Validate Single <resource>', () => {
      cy.request('GET',`/api/unknown/2`,).then((response) => {
          expect(response.status).to.eq(200);
            
          expect(response.duration).to.be.lessThan(500);

          const jsonData = response.body;
          expect(jsonData.data.id).to.be.a('number');

          expect(jsonData.data.name).to.be.a('string').that.is.not.empty;

          expect(jsonData.support.url).to.be.a('string').that.is.not.empty;

          expect(jsonData.support.url.startsWith('https://')).to.be.true;
      });
    });

    it('Validate Single <resource> Not Found', () => {
      cy.request({
        method: 'GET',
        url: '/api/unknown/23', 
        failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
  
        expect(response.duration).to.be.lessThan(500);
  
        expect(response.body).to.be.empty;

      });
    });

    it('Validate Create', () => {
      cy.request({
        method: 'POST',
        url: '/api/users',
        body: {
          name: 'morpheus',
          job: 'leader',
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
  
        expect(response.duration).to.be.lessThan(1000);
  
        expect(response.body).to.have.property('name', 'morpheus');
        expect(response.body).to.have.property('job', 'leader');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');

        expect(response.body.id).to.be.a('string').that.is.not.empty;

        const createdAt = new Date(response.body.createdAt);
        expect(createdAt.toISOString()).to.eql(response.body.createdAt);

      });
    });

    it('Validate PUT update', () => {
      cy.request({
        method: 'PUT',
        url: '/api/users/2',
        body: {
          "name": "morpheus",
          "job": "zion resident"
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.duration).to.be.lessThan(1000);
  
        expect(response.body).to.have.property('name', 'morpheus');
        expect(response.body).to.have.property('job', 'zion resident');
        expect(response.body).to.have.property('updatedAt');

        expect(response.body.name).to.be.a('string').that.is.not.empty;

        const updatedAt = new Date(response.body.updatedAt);
        expect(updatedAt.toISOString()).to.eql(response.body.updatedAt);

      });
    });

    it('Validate PATCH update', () => {
      cy.request({
        method: 'PATCH',
        url: '/api/users/2',
        body: {
          "name": "morpheus",
          "job": "zion resident"
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.duration).to.be.lessThan(1000);
  
        expect(response.body).to.have.property('name', 'morpheus');
        expect(response.body).to.have.property('job', 'zion resident');
        expect(response.body).to.have.property('updatedAt');

        expect(response.body.name).to.be.a('string').that.is.not.empty;

        const updatedAt = new Date(response.body.updatedAt);
        expect(updatedAt.toISOString()).to.eql(response.body.updatedAt);

      });
    });

    it('Validate delete', () => {
      cy.request({
        method: 'DELETE',
        url: '/api/users/2',
      }).then((response) => {
        expect(response.status).to.eq(204);
  
        expect(response.duration).to.be.lessThan(1000);
  
        expect(response.body).to.be.empty;

      });
    });

    it('Validate register-successful', () => {
      cy.request({
        method: 'POST',
        url: '/api/register',
        body:{
          "email": "eve.holt@reqres.in",
          "password": "pistol"
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.duration).to.be.lessThan(1000);

        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('token');

        expect(response.body.id).to.be.a('number').that.is.not.null;
        expect(response.body.token).to.be.a('string').that.is.not.empty;

      });
    });

    it('Validate register-unsuccessful', () => {
      cy.request({
        method: 'POST',
        url: '/api/register',
        failOnStatusCode: false,
        body:{
          "email": "sydney@fife"
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
  
        expect(response.duration).to.be.lessThan(1000);

        expect(response.body).to.have.property('error');

        expect(response.body.error).to.eq('Missing password');

      });
    });

    it('Validate login-successful', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body:{
          "email": "eve.holt@reqres.in",
          "password": "cityslicka"
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.duration).to.be.lessThan(1000);

        expect(response.body).to.have.property('token');

        expect(response.body.token).to.be.a('string').that.is.not.empty;

      });
    });

    it('Validate login-unsuccessful', () => {
      cy.request({
        method: 'POST',
        url: '/api/login',
        failOnStatusCode: false,
        body:{
          "email": "peter@klaven"
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
  
        expect(response.duration).to.be.lessThan(1000);

        expect(response.body).to.have.property('error');

        expect(response.body.error).to.eq('Missing password');

      });
    });

    it('Validate Delayed Response', () => {
      cy.request('GET',`/api/users?delay=3`,).then((response) => {
          expect(response.status).to.eq(200);
            
          expect(response.duration).to.be.lessThan(4000);
  
          expect(response.body).to.have.property('page');
          expect(response.body).to.have.property('per_page');
          expect(response.body).to.have.property('total');
          expect(response.body).to.have.property('total_pages');
          expect(response.body).to.have.property('data');
          expect(response.body).to.have.property('support');

          response.body.data.forEach((user) => {
            expect(user).to.have.property('id');
            expect(user).to.have.property('email');
            expect(user).to.have.property('first_name');
            expect(user).to.have.property('last_name');
            expect(user).to.have.property('avatar');
          });
          expect(response.body.support.url).to.be.a('string').that.includes('http');
          
      });
    });
  });