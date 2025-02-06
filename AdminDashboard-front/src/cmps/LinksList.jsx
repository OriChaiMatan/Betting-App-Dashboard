import { LinkPreview } from "./LinkPreview"

export function LinksList({ links, onRemoveLink }) {

    if (!links) return <div>Loading..</div>
    return (
        <ul className="link-list">
            {links.map((link) => (
                <li key={link._id} >
                    <LinkPreview link={link} onRemoveLink={onRemoveLink}/>
                </li>
            ))}
        </ul>
    );
}
