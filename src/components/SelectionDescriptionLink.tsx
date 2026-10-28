import '../styles/selection-description-link.css'

function SelectionDescriptionLink({ targetId }: { readonly targetId: string }) {
  return (
    <a
      className="selection-description-link"
      href={`#${targetId}`}
      onClick={() => document.getElementById(targetId)?.focus({ preventScroll: true })}
    >
      선택한 설명 보기 <span aria-hidden="true">↓</span>
    </a>
  )
}

export default SelectionDescriptionLink
