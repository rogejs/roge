import type React from "react";
import type { PropsWithoutRef } from "react";

export function createRoute<T>({
	component,
}: {
	component: (props: PropsWithoutRef<T>) => React.JSX.Element | React.ReactNode;
}) {
	return component;
}
