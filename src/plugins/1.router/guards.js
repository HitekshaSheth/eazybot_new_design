import { canNavigate } from '@layouts/plugins/casl'

export const setupGuards = router => {
  // 👉 router.beforeEach
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
    router.beforeEach((to, from, next) => {
        const publicPages = ['login', 'forgot-password']
        const isPublic = publicPages.includes(to.name as string)
        const isLoggedIn = !!localStorage.getItem('accessToken')

        if (!isPublic && !isLoggedIn) {
            next({ name: 'login' })
        } else {
            next()
        }
    })
}
