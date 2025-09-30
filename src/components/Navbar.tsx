import { Button } from "./ui/button";


const Navbar = () => {
    return (
        <nav className="container flex justify-between items-center mx-auto max-w-4xl border-2 border-white/40 p-3 rounded-full bg-white/20 backdrop-blur-sm select-none" style={{ boxShadow: "inset -4px -4px 4px 4px rgba(255, 255, 255, 0.1)" }}>
            <div className="mx-4">Logo Here</div>
            <ul className="group/parent hidden sm:flex items-center gap-4 md:gap-10 [&>*]:cursor-pointer">
                <li className="relative group-hover/parent:text-neutral-300 hover:text-white transition duration-300 group">
                    <span className="relative z-10">Home</span>     
                    {/* The border element: initial state is scale-x-0 */}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-white transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"></span>
                </li>
                <li className="relative group-hover/parent:text-neutral-300 hover:text-white transition duration-300 group">
                    <span className="relative z-10">About</span>
                    {/* The border element: initial state is scale-x-0 */}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-white transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"></span>
                </li>
                <li className="relative group-hover/parent:text-neutral-300 hover:text-white transition duration-300 group">
                    <span className="relative z-10">Services</span>
                    {/* The border element: initial state is scale-x-0 */}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-white transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"></span>
                </li>
                <li className="relative group-hover/parent:text-neutral-300 hover:text-white transition duration-300 group">
                    <span className="relative z-10">Contact</span>
                    {/* The border element: initial state is scale-x-0 */}
                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-full bg-white transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"></span>
                </li>
            </ul>
            <Button type="button" className="rounded-full">info@pakailabs.com</Button>
        </nav>
    )
}

export default Navbar;