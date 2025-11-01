function Footer() {
    return <footer
        className="text-center px-[5%] py-4 bg-retro-surface/80 backdrop-blur-md shadow-[0_-4px_40px_rgba(255,190,11,0.3)] text-retro-muted text-xs">

        <div className="flex flex-wrap justify-center items-center gap-8 my-2 text-sm">
            <a href="#" className="order-first hover:text-retro-accent transition-colors">À propos</a>
            <a href="#" className="order-first hover:text-retro-accent transition-colors">Règles</a>
            <p className="order-last sm:order-first font-title text-retro-accent text-lg">PIXIA</p>
            <a href="#" className="hover:text-retro-accent transition-colors">Contact</a>
            <a href="#" className="hover:text-retro-accent transition-colors">Mentions légales</a>
        </div>
    </footer>
}

export default Footer
