module.exports = {
  apps: [{
    name: 'it-jobs',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    env: {
      PORT: 3555,
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
