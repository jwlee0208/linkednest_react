module.exports = {
    apps: [
      {
         name: "front",
         script: "npm",
         instances: 'max',
         exec_mode: "cluster",
         args: "start",
         watch: true,
         merge_logs: true,
         max_restarts: 10,
         min_uptime: 10000,
         listen_timeout: 50000,
         kill_timeout: 5000,
         cwd: '/usr/local/front/'
      }
   ]
 }
 