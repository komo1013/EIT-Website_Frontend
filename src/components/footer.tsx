export default function Footer() {
    return (
        <footer className="text-black dark:text-white backdrop-blur-md bg-background-80 border-b border-divider bg-opacity-50">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Fachschaft EIT</p>
            </div>
        </footer>
    )
}