import type {
  WikiHotspotId,
  WikiProductFixture,
} from '../../content/content-types.ts'
import { ProductHotspot } from '../product-case/AnnotatedProductSurface.tsx'

interface WikiProductViewProps {
  readonly fixture: WikiProductFixture
  readonly activeId: WikiHotspotId | null
  readonly onActivate: (id: WikiHotspotId) => void
}

function WikiProductView({
  fixture,
  activeId,
  onActivate,
}: WikiProductViewProps) {
  return (
    <section
      className="wiki-product"
      data-has-active={activeId ? 'true' : 'false'}
      aria-label={`${fixture.productName} Outline home 공개 재구성 화면`}
    >
      <header className="wiki-product-topbar">
        <span className="wiki-product-brand" aria-hidden="true">
          <b>J</b>
          <strong>{fixture.productName}</strong>
          <small>{fixture.platformLabel}</small>
        </span>

        <ProductHotspot
          id="search-entry"
          activeId={activeId}
          label="Global document search entry"
          className="wiki-search-entry"
          onActivate={onActivate}
        >
          <span aria-hidden="true">⌕</span>
          <strong>{fixture.searchPlaceholder}</strong>
          <kbd aria-hidden="true">⌘ K</kbd>
        </ProductHotspot>

        <span className="wiki-create-entry" aria-hidden="true">
          <b>＋</b>
          {fixture.createLabel}
        </span>
      </header>

      <div className="wiki-product-workspace">
        <aside className="wiki-sidebar">
          <span className="wiki-sidebar-label" aria-hidden="true">
            {fixture.workspaceLabel}
          </span>

          <span className="wiki-primary-navigation" aria-hidden="true">
            {fixture.primaryNavigation.map((item) => (
              <span data-active={item.active ? 'true' : 'false'} key={item.label}>
                <b>{item.symbol}</b>
                {item.label}
              </span>
            ))}
          </span>

          <span className="wiki-collection-label" aria-hidden="true">
            COLLECTIONS
          </span>

          <ProductHotspot
            id="collection-structure"
            activeId={activeId}
            label="Collections grouped as reader entry routes"
            className="wiki-collection-entry"
            onActivate={onActivate}
          >
            <span className="wiki-collection-list" aria-hidden="true">
              {fixture.collections.map((collection) => (
                <span key={collection.label}>
                  <b>{collection.symbol}</b>
                  <strong>{collection.label}</strong>
                </span>
              ))}
            </span>
          </ProductHotspot>

          <span className="wiki-sidebar-footer" aria-hidden="true">
            <span>＋ NEW COLLECTION</span>
            <span>▣ ARCHIVE</span>
          </span>
        </aside>

        <section className="wiki-content-canvas">
          <header className="wiki-content-heading" aria-hidden="true">
            <span>
              <small>KNOWLEDGE HOME</small>
              <strong>홈</strong>
            </span>
            <b>{fixture.actor.initials}</b>
          </header>

          <ProductHotspot
            id="return-views"
            activeId={activeId}
            label="Recent popular updated and authored return views"
            className="wiki-return-views"
            onActivate={onActivate}
          >
            <span className="wiki-tab-list" aria-hidden="true">
              {fixture.tabs.map((tab) => (
                <span data-active={tab.active ? 'true' : 'false'} key={tab.label}>
                  {tab.label}
                </span>
              ))}
            </span>
          </ProductHotspot>

          <ProductHotspot
            id="document-metadata"
            activeId={activeId}
            label="Recent documents with editor collection and recency context"
            className="wiki-document-context"
            onActivate={onActivate}
          >
            <span className="wiki-document-list" aria-hidden="true">
              {fixture.documents.map((document) => (
                <span className="wiki-document-row" key={document.title}>
                  <b className="wiki-document-icon">▰</b>
                  <span>
                    <strong>{document.title}</strong>
                    <small>
                      {document.editedBy.name} · {document.updated} ·{' '}
                      {document.collection} · {document.viewed}
                    </small>
                  </span>
                  <em>↗</em>
                </span>
              ))}
            </span>
          </ProductHotspot>

          <span className="wiki-surface-note" aria-hidden="true">
            BROWSEABLE HOME · CONTENT REMAINS IN SOURCE DOCUMENTS
          </span>
        </section>
      </div>
    </section>
  )
}

export default WikiProductView
