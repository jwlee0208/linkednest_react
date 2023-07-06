module.exports = {
    apps: [
      {
         name      : "front",
         script    : "npm",
         instances : '1',
         exec_mode : "cluster",
         args      : "run start:prod",
         watch     : true,
         env       : {
             NODE_ENV: 'production',
             PORT    : 3001
         },
         log_date_format: 'YYYY-MM-DD HH:mm:ss',
         log_file       : '/usr/local/front/logs/front.log',
         error_file     : '/usr/local/front/logs/front_err.log',
         out_file       : '/usr/local/front/logs/out/out.log',
         merge_logs     : true,
         max_restarts   : 10,
         min_uptime     : 10000,
         listen_timeout : 50000,
         kill_timeout   : 5000,
         cwd            : '/usr/local/git_repo/front/'
      },
      {
         name      : "front2",
         script    : "npm",
         instances : '1',
         exec_mode : "cluster",
         args      : "run start:prod",
         watch     : true,
         env       : {
             NODE_ENV: 'production',
             PORT    : 3002
         },
         log_date_format: 'YYYY-MM-DD HH:mm:ss',
         log_file       : '/usr/local/front/logs/front.log',
         error_file     : '/usr/local/front/logs/front_err.log',
         out_file       : '/usr/local/front/logs/out/out.log',
         merge_logs     : true,
         max_restarts   : 10,
         min_uptime     : 10000,
         listen_timeout : 50000,
         kill_timeout   : 5000,
         cwd            : '/usr/local/git_repo/front/'
      }
   ]
 }
 