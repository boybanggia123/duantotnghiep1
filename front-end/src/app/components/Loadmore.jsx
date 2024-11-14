import Link from "next/link";

export default function Loadmore() {
    return (
        <>
            {/* xem them trang */}
            <Link href={"/sanpham"} className="namesup">
            <div className="text-center my-3">
                <button className="btn load-more-btn">
                    Load more
                </button>
            </div>  
            </Link>
        </>
    )
}
