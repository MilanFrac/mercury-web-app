export default function Header({ text = 'header', level = 1 }) {
    const Tag = ( level < 1 || level > 6 ) ? 'h1' : 'h' + level;

    return (
        <>
            <Tag> {text} </Tag>
        </>
    );
}