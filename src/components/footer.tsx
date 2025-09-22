export default function Footer() {
    return (
        <footer className="opacity-100 text-black dark:text-white">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Fachschaft EIT.</p>
            </div>
        </footer>
    )
}