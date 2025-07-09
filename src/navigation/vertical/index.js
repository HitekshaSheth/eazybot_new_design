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
  },
  {
    title: 'Packages',
    icon: { icon: 'tabler-rocket' },
    // to: 'apps-email',
  },
  {
    title: 'My Loyalty Points',
    icon: { icon: 'tabler-cube' },
    // to: 'apps-chat',
  },
  { heading: 'Account' },
  {
    title: 'My Account',
    icon: { icon: 'tabler-password-user' },
    children: [
      { title: 'Test1' },
      { title: 'Test2' }
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
