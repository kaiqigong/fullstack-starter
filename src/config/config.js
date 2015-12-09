import path from 'path';
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'crp2'
    },
    port: 3000,
    db: 'mongodb://localhost/crp2-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'crp2'
    },
    port: 3000,
    db: 'mongodb://localhost/crp2-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'crp2'
    },
    port: 3000,
    db: 'mongodb://localhost/crp2-production'
  }
};

export default config[env];
