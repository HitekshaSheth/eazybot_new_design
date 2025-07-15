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
    // to: 'apps-email',
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
      { title: 'My Profile' },
      { title: 'My Subscription' },
      { title: 'PNL report' },
      { title: 'Holding report' },
      { title: 'My Exchanges' , to: { name: 'my-exchanges' }},
      { title: 'My Vouchers' },
      { title: 'My Affiliate Center' },
      { title: 'Change Password' },
    ],
  },
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
