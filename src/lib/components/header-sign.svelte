<script>
	import Texture from '$lib/assets/images/texture.webp';
	import MetalTexture from '$lib/assets/images/metal-texture.jpg';
</script>

<main
	class="pointer-events-none"
	style="--metal-texture: url('{MetalTexture}'); --glass-texture: url('{Texture}')"
>
	<div class="sign-container">
		<div class="ceiling-rods">
			<div class="support-rod"></div>
			<div class="support-rod"></div>
		</div>

		<div class="mounting-brackets">
			<div class="bracket"></div>
			<div class="bracket"></div>
		</div>

		<div class="sign-housing">
			<div class="lcd-bezel">
				<div class="lcd-screen">
					<div class="glass-overlay"></div>
					<div class="display-content">
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		padding: 2rem 1rem;
		padding-top: 10vh;
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem 0.5rem;
			padding-top: 10vh;
		}
	}

	.sign-container {
		position: relative;
		transform: perspective(1000px) rotateX(-1deg);
		width: 100%;
		max-width: 680px;
	}

	@media (max-width: 768px) {
		.sign-container {
			transform: perspective(800px) rotateX(-0.5deg);
			max-width: 100%;
		}
	}

	.ceiling-rods {
		position: absolute;
		top: -100vh;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		padding: 0 75px;
		height: 100vh;
		pointer-events: none;
	}

	@media (max-width: 768px) {
		.ceiling-rods {
			padding: 0 35px;
		}
	}

	.support-rod {
		width: 24px;
		height: 100vh;
		background:
			radial-gradient(
				ellipse at 30% 0%,
				rgba(216, 216, 216, 0.9) 0%,
				rgba(192, 192, 192, 0.9) 20%,
				rgba(168, 168, 168, 0.9) 40%,
				rgba(150, 150, 150, 0.9) 60%,
				rgba(168, 168, 168, 0.9) 80%,
				rgba(192, 192, 192, 0.9) 95%,
				rgba(216, 216, 216, 0.9) 100%
			),
			var(--metal-texture);
		background-size:
			100% 100%,
			50px 50px;
		background-position: center, center;
		background-blend-mode: multiply;
		background-size: cover;
		border-radius: 12px;
		box-shadow:
			inset -3px 0 6px rgba(0, 0, 0, 0.2),
			inset 3px 0 6px rgba(255, 255, 255, 0.4),
			3px 0 8px rgba(0, 0, 0, 0.15),
			-2px 0 4px rgba(0, 0, 0, 0.1);
		position: relative;
	}

	@media (max-width: 768px) {
		.support-rod {
			width: 18px;
		}
	}

	.support-rod::before {
		content: '';
		position: absolute;
		top: 0;
		left: 4px;
		width: 3px;
		height: 100%;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 2px;
	}

	.support-rod::after {
		content: '';
		position: absolute;
		top: 0;
		right: 4px;
		width: 2px;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 1px;
	}

	.mounting-brackets {
		position: absolute;
		top: -10px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		padding: 0 60px;
	}

	@media (max-width: 768px) {
		.mounting-brackets {
			padding: 0 20px;
		}
	}

	.bracket {
		width: 50px;
		height: 25px;
		background:
			linear-gradient(
				145deg,
				rgba(208, 208, 208, 0.9) 0%,
				rgba(184, 184, 184, 0.9) 30%,
				rgba(160, 160, 160, 0.9) 70%,
				rgba(153, 153, 153, 0.9) 100%
			),
			var(--metal-texture);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-blend-mode: multiply;
		border: 1px solid #888888;
		border-radius: 8px 8px 0 0;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.2),
			inset 0 1px 2px rgba(255, 255, 255, 0.4);
		position: relative;
	}

	.bracket::before {
		content: '';
		position: absolute;
		top: 5px;
		left: 50%;
		transform: translateX(-50%);
		width: 8px;
		height: 8px;
		background: radial-gradient(circle, #222222 0%, #444444 40%, #666666 100%);
		border-radius: 50%;
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.6),
			0 1px 1px rgba(255, 255, 255, 0.2);
	}

	.sign-housing {
		background:
			linear-gradient(
				145deg,
				rgba(213, 213, 213, 0.9) 0%,
				rgba(192, 192, 192, 0.9) 30%,
				rgba(176, 176, 176, 0.9) 70%,
				rgba(168, 168, 168, 0.9) 100%
			),
			var(--metal-texture);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-blend-mode: multiply;
		border: 1px solid #999999;
		border-radius: 4px;
		padding: 6px;
		box-shadow:
			0 8px 16px rgba(0, 0, 0, 0.25),
			inset 0 2px 4px rgba(255, 255, 255, 0.3),
			inset 0 -1px 2px rgba(0, 0, 0, 0.1);
		position: relative;
		width: 100%;
		max-width: 680px;
	}

	@media (max-width: 768px) {
		.sign-housing {
			padding: 4px;
			border-radius: 6px;
		}
	}

	.lcd-bezel {
		background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%);
		border: 1px solid #333333;
		border-radius: 4px;
		padding: 8px;
		box-shadow:
			inset 0 2px 4px rgba(0, 0, 0, 0.8),
			0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.lcd-screen {
		background: oklch(0.1808 0.0743 304.1433);
		border-radius: 2px;
		padding: 28px 28px;
		position: relative;
		overflow: hidden;
		min-height: 120px;
	}

	@media (max-width: 768px) {
		.lcd-screen {
			padding: 20px 16px;
			min-height: 100px;
		}
	}

	.glass-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)), var(--glass-texture);
		background-size: cover;
		background-position: center;
		border-radius: 2px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(1.8px);
		-webkit-backdrop-filter: blur(1.8px);
		border: 1px solid rgba(255, 255, 255, 0.29);
		pointer-events: none;
		opacity: 0.3;
	}

	.display-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		height: 100%;
		position: relative;
		z-index: 2;
	}

	.title-section {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 8px;
		text-align: left;
		margin-bottom: 10px;
	}

	.main-title-row {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.kannada-text {
		font-family: 'Inter', sans-serif;
		font-size: 20px;
		font-weight: 600;
		color: white;
		text-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
		letter-spacing: 0.5px;
		line-height: 1.2;
	}

	.main-title {
		font-family: 'Inter', sans-serif;
		font-size: 38px;
		font-weight: 800;
		color: white;
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
		letter-spacing: 0.2px;
		line-height: 1.1;
		text-transform: uppercase;
	}

	@media (max-width: 768px) {
		.kannada-text {
			font-size: 16px;
			letter-spacing: 0.3px;
		}

		.main-title {
			font-size: 28px;
			letter-spacing: 0.1px;
		}
	}

	.metro-icon {
		color: white;
		filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
		flex-shrink: 0;
		margin-top: -6%;
	}

	.divider {
		width: 100%;
		height: 1px;
		background: rgba(255, 255, 255, 0.25);
		margin: 10px 0;
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.platform-info-compact {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 16px;
	}

	.second-row {
		display: contents;
	}

	@media (max-width: 768px) {
		.platform-info-compact {
			gap: 8px;
			flex-direction: column;
			align-items: stretch;
		}

		.second-row {
			display: flex;
			align-items: center;
			gap: 8px;
			justify-content: space-between;
		}
	}

	.platform-compact {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.platform-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: white;
		color: oklch(0.1808 0.0743 304.1433);
		border-radius: 50%;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 800;
		box-shadow:
			0 2px 6px rgba(0, 0, 0, 0.2),
			inset 0 1px 2px rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
	}

	.destination-text {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.kannada-compact {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		font-weight: 600;
		color: white;
		text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
		letter-spacing: 0.3px;
		white-space: nowrap;
		line-height: 1.1;
	}

	.english-compact {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 0 3px rgba(255, 255, 255, 0.2);
		letter-spacing: 0.2px;
		white-space: nowrap;
		line-height: 1.1;
	}

	@media (max-width: 768px) {
		.kannada-compact {
			font-size: 12px;
			white-space: normal;
		}

		.english-compact {
			font-size: 14px;
			white-space: normal;
		}
	}

	.divider-vertical {
		width: 1px;
		height: 24px;
		background: rgba(255, 255, 255, 0.25);
		box-shadow: 1px 0 0 rgba(255, 255, 255, 0.1);
	}

	.mobile-horizontal {
		display: none;
	}

	.desktop-only {
		display: block;
	}

	.mobile-facility-row {
		display: none;
	}

	.desktop-facility {
		display: flex;
	}

	.desktop-facility-divider {
		display: block;
	}

	@media (max-width: 768px) {
		.divider-vertical {
			width: 1px;
			height: 24px;
		}

		.desktop-only {
			display: none;
		}

		.desktop-facility {
			display: none;
		}

		.desktop-facility-divider {
			display: none;
		}

		.mobile-facility-row {
			display: flex;
			justify-content: flex-start;
			margin-top: 8px;
		}

		.mobile-horizontal {
			display: block;
			width: 100%;
			height: 1px;
			background: rgba(255, 255, 255, 0.25);
			box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
			margin: 8px 0;
		}
	}

	.facility-icons {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.facility-text {
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		font-weight: 600;
		color: white;
		text-align: center;
		text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
		letter-spacing: 0.2px;
		white-space: nowrap;
	}

	.icon-small {
		color: white;
		text-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
	}

	.lcd-screen {
		animation: screen-flicker 18s ease-in-out infinite;
	}

	@keyframes screen-flicker {
		0%,
		98%,
		100% {
			opacity: 1;
		}
		99% {
			opacity: 0.97;
		}
	}
</style>
