import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    onClick,
    children,
    className,
    leftIcon,
    rightIcon,
    text = false,
    small = false,
    large = false,
    primary = false,
    outline = false,
    disabled = false,
    rounded = false,
    ...passProps
}) {
    let Components = 'button';

    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (props[key]) {
                delete props[key];
            }
        })
    }

    if (to) {
        props.to = to;
        Components = Link;
    } else if (href) {
        props.href = href;
        Components = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
        [className]: className,
    });
    return (
        <Components className={classes} {...props}>
            {leftIcon && <span className = {cx('icon')}>{leftIcon}</span>}
            <span className = {cx('title')}>{children}</span>
            {rightIcon && <span className = {cx('icon')}>{rightIcon}</span>}

        </Components>
    );
}

export default Button;
