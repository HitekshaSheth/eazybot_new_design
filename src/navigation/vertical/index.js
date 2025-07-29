export default [
  {
    title: 'Dashboards',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
  },
  { heading: 'Apps' },
  {
    title: 'My Bots',
    icon: { icon: 'tabler-shopping-cart' },
    to: { name: 'bots' },
  },
  {
    title: 'Trading Insights',
    icon: { icon: 'tabler-chart-dots' },
  },
  {
    title: 'My Wallet',
    icon: { icon: 'tabler-wallet' },
    to: { name: 'my-wallet' },
  },
  {
    title: 'Packages',
    icon: { icon: 'tabler-rocket' },
    to: { name: 'packages' },
  },
  {
    title: 'My Loyalty Points',
    icon: { icon: 'tabler-cube' },
    to: { name: 'my-loyalty-points' },
    // to: 'apps-chat',
  },
  { heading: 'Account' },
  {
    title: 'My Account',
    icon: { icon: 'tabler-password-user' },
    children: [
      { title: 'My Profile', icon: { icon: 'tabler-users' }, to : {name: 'account-settings-account'} },
      { title: 'My Subscription', icon: { icon: 'tabler-file-text' }, to : {name: 'account-settings-billing-plans'} },
      { title: 'My Exchanges', icon: { icon: 'tabler-exchange' } , to: { name: 'my-exchanges' }},
      { title: 'My Vouchers', icon: { icon: 'tabler-gift-card' } },
      { title: 'Password and 2FA', icon: { icon: 'tabler-lock' }, to : {name: 'account-settings-security'} },
      { title: 'Notifications', icon: { icon: 'tabler-bell' }, to : {name: 'account-settings-notification'} },
    ],
  },
  { heading: 'Error Pages' },
  {
    title: 'Comming Soon',
    icon: { icon: 'tabler-telescope' },
    to : {name: 'error-coming-soon'}
  },
  {
    title: 'Under Maintenance',
    icon: { icon: 'tabler-folder-question' },
    to : {name: 'error-under-maintenance'}
  },
  { title: 'Page Not Found - 404',icon: { icon: 'tabler-error-404' }, to: { path: '/error/404' }, target: '_blank' },
  { title: 'Not Authorized - 401',icon: { icon: 'tabler-license-off' }, to: { name: 'error-not-authorized' }, target: '_blank' },

  { heading: 'Help & Support' },
  {
    title: 'Resource Guide',
    icon: { icon: 'tabler-color-swatch' }
    // to: 'pages-typography'
  },
  {
    title: 'Company Overview',
    icon: { icon: 'tabler-devices-check' }
    // to: 'pages-typography'
  },
  {
    title: 'Help Center',
    icon: { icon: 'tabler-help-circle' }
    // to: 'pages-typography'
  }
]
