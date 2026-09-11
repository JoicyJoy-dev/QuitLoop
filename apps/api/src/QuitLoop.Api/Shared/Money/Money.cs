using QuitLoop.Api.Shared.Regional;

namespace QuitLoop.Api.Shared.Money;

/// <summary>
/// A monetary amount in integer minor units plus an ISO 4217 currency code.
/// Do not use floating-point types for money, and do not assume a single currency.
/// </summary>
public readonly record struct Money
{
    public Money(long amountMinorUnits, string currencyCode)
    {
        AmountMinorUnits = amountMinorUnits;
        CurrencyCode = IsoCurrencyCode.Normalize(currencyCode);
    }

    public long AmountMinorUnits { get; }
    public string CurrencyCode { get; }
}
