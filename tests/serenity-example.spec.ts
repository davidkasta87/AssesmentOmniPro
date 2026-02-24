import { describe, it } from '@serenity-js/playwright-test'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, startsWith } from '@serenity-js/assertions'

// this is a simple Serenity/JS test demonstrating that the integration is
// correctly installed and can be executed alongside regular Playwright tests.
describe('Serenity/JS integration', () => {
    it('demonstrates a simple navigation', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://serenity-js.org/'),
            Ensure.that(Page.current().title(), startsWith('Serenity/JS')),
        )
    })
})
