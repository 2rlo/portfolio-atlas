import type { WikiPageContent } from '../../content/content-types.ts'
import ReusableWhatCasePage from '../product-case/ReusableWhatCasePage.tsx'
import WikiProductView from './WikiProductView.tsx'

function WikiPage({ content }: { readonly content: WikiPageContent }) {
  return (
    <ReusableWhatCasePage
      content={content}
      pageClassName="wiki-page"
      titleId="wiki-title"
      surfaceLabel="Outline 지식 공간 홈의 탐색 구조"
      workflowLabel="Wiki 컬렉션·검색·최근 문서에서 본문으로 가는 흐름"
      relatedLabel="Wiki와 연결된 시스템"
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
