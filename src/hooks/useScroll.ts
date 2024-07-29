import { useEffect, useState } from "react"

const defaultScrollTopValue = 50;

export const useScroll = (scroll: number = defaultScrollTopValue) => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > scroll) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [scroll]);

    return scrolled;
}
