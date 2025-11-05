import {useModal} from "../../contexts/modalContext.tsx"

function Footer() {
    const {openModal} = useModal()

    return <footer
        className="text-center px-[5%] py-4 bg-retro-surface/80 backdrop-blur-md shadow-[0_-4px_40px_rgba(255,190,11,0.3)] text-retro-muted text-xs">

        <div className="flex flex-wrap justify-center items-center gap-8 my-2 text-sm">
            <button type="button" onClick={() => openModal(
                <div>
                    <h2 className="font-title text-retro-accent text-2xl mb-4">Titre</h2>
                    <p>Contenu quelconque...</p>
                    <button className="btn-primary mt-4">Action</button>
                </div>
            )}
                    className="order-first hover:text-retro-accent transition-colors">À propos
            </button>
            <button type="button" className="order-first hover:text-retro-accent transition-colors">Règles</button>
            <p className="order-last sm:order-first font-title text-retro-accent text-lg">PIXIA</p>
            <button type="button" className="hover:text-retro-accent transition-colors">Contact</button>
            <button type="button" className="hover:text-retro-accent transition-colors">Mentions légales</button>
        </div>
    </footer>
}

export default Footer
