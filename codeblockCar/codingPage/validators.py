from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_action_code(code):
    if code > 4 or code < 1:
        raise ValidationError(
            _('%(code)s is invalid'),
            params = {'code': code},
        )