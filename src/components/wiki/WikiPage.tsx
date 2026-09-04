import type { WikiPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import WikiProductView from './WikiProductView.tsx'

function WikiPage({ content }: { readonly content: WikiPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="wiki-page"
      titleId="wiki-title"
      surfaceLabel="Outline knowledge workspace home inspection"
      workflowLabel="Browse search return and open Wiki workflow"
      relatedLabel="Wiki related systems"
      renderProduct={({ fixture, activeId, onActivate }) => (
        <WikiProductView
          fixture={fixture}
          activeId={activeId}
          onActivate={onActivate}
        />
      )}
    />
  )
}

export default WikiPage
